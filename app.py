from flask import Flask, request, jsonify,Response
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.utils import secure_filename
import smtplib
import random

app = Flask(__name__)
global_number=0
CORS(app)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'monkey_#lindo@9731'
app.config['MYSQL_DB'] = 'customer_db'

SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_ADDRESS = 'goels5394@gmail.com'  # Replace with your Gmail address
EMAIL_PASSWORD = 'ocmkhcpwvmpoofpd'

mysql = MySQL(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    email = data['email']
    password = data['password']
    phone = data['phone']

    cur = mysql.connection.cursor()

    # Check if the email or password already exists
    cur.execute("SELECT * FROM customers WHERE email = %s OR password = %s", (email, password))
    existing_user = cur.fetchone()

    if existing_user:
        cur.close()
        return jsonify({'message': 'Email or password already exists!'}), 400

    # Insert the new customer if no conflicts
    cur.execute(
        "INSERT INTO customers (email, password, phone) VALUES (%s, %s, %s)",
        (email, password, phone)
    )
    mysql.connection.commit()
    cur.close()

    try:
        send_email(email)
    except Exception as e:
        return jsonify({'message': 'Customer added but email failed to send', 'error': str(e)}), 500

    return jsonify({'message': 'Customer added successfully and email sent!'}), 200
    
def send_email(recipient_email):
    subject = "Welcome to Goel Electricals!"
    body = f"Hi there,\n\nThank you for signing up with us!\nYou are just few steps away to complete your profile\n\nRegards,\nGoel ELctricals"

    # Establish connection to the SMTP server
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)  # Login to the email account
        # Construct the email
        message = f"Subject: {subject}\n\n{body}"
        # Send the email
        server.sendmail(EMAIL_ADDRESS, recipient_email, message)

@app.route('/otp_to_email',methods=['POST'])
def otp_to_email():
    data = request.json
    email = data['email']

    cur = mysql.connection.cursor()

    # Check if the email or password already exists
    cur.execute("SELECT * FROM customers WHERE email = %s ", (email,))
    existing_user = cur.fetchone()

    if existing_user:
        try:
          send_otp(email)
          cur.close()
          return jsonify({"message":"otp sent successfully"}),200
        except Exception as e:
          cur.close()
          return jsonify({'message': 'email failed to send', 'error': str(e)}), 500

    else:
        cur.close()
        return jsonify({'message': 'Email not registered !'}), 400

    
def send_otp(recipient_email):
    subject = "Goel Electricals"
    global random_number
    random_number = random.randint(100000, 999999)
    body = f"Hi there,\n\nThis is your OTP for your password setup process.\n {random_number}\n\nRegards,\nGoel Electricals"

    # Establish connection to the SMTP server
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)  # Login to the email account
        # Construct the email
        message = f"Subject: {subject}\n\n{body}"
        # Send the email
        server.sendmail(EMAIL_ADDRESS, recipient_email, message)

@app.route('/otp_checker',methods=['POST'])
def otp_checker():
    data = request.json
    otp = data['otp']
    otp=int(otp)

    if(otp==random_number):
         return jsonify({"message":"OTP Matches"}),200
    else:
         return jsonify({"message":"OTP does not match"}),400
    

@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data['email']
    password = data['password']
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM customers WHERE email = %s AND password = %s", (email, password))
    user = cur.fetchone()
    cur.close()
    
    if user:
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
    
@app.route('/set_new_password',methods=['POST'])
def set_new_password():
    data = request.json
    email = data['email']
    new_password = data['new_password']

    cur = mysql.connection.cursor()
     
    try:
      cur.execute("UPDATE CUSTOMERS SET PASSWORD = %s WHERE EMAIL = %s ", (new_password,email))
      cur.close()
      return jsonify({'message':"New password has been set up."}),200
    except Exception as e:
        cur.close()
        return jsonify({'message':"Some error eoccured"}),500


@app.route('/profile', methods=['POST'])
def profile():
    data = request.json
    name = data['Name']
    age = data['Age']
    state = data['State']
    district=data["District"]
    dob=data["DOB"]
    email=data["userEmail"]

    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM customers WHERE email = %s", (email,))
    if not cur.fetchone():
        cur.close()
        return jsonify({'message': 'User not found!'}), 404
    cur.execute("INSERT INTO profile (email,name,age,state,district,dob) VALUES (%s,%s, %s, %s,%s,%s)", (email,name, age, state,district,dob))
    mysql.connection.commit()
    cur.close()
    
    return jsonify({'message': 'Customer added successfully!'}), 200

@app.route('/combined-data/<email>', methods=['GET'])
def combined_data(email):
    cur = mysql.connection.cursor()

    # Fetch data from customers table for specific email
    cur.execute("SELECT * FROM customers WHERE email = %s", (email,))
    customer_data = cur.fetchone()

    if customer_data:
        # Fetch data from profile table for the same user
        cur.execute("SELECT * FROM profile WHERE email = %s", (email,))
        profile_data = cur.fetchone()

        cur.close()

        if profile_data:
            data = {
                'email': profile_data[1],
                'phone': customer_data[3],
                'name': profile_data[2],
                'age': profile_data[3],
                'dob': profile_data[6],
                'state': profile_data[4],
                'district': profile_data[5],
                'password': customer_data[2]
            }
            return jsonify(data), 200
    
    cur.close()
    return jsonify({'message': 'No data found'}), 404

    
@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading'}), 400

    # Save the file's binary data to the database
    file_binary = file.read()
    filename = file.filename

    try:
        # Use the connection from the MySQL instance
        conn = mysql.connection
        cursor = conn.cursor()

        query = "INSERT INTO user_images (filename, image_data) VALUES (%s, %s)"
        cursor.execute(query, (filename, file_binary))
        conn.commit()
        cursor.close()

        return jsonify({'message': 'File uploaded successfully'}), 200
    except Exception as e:
        print(e)
        return jsonify({'message': 'Failed to upload file'}), 500
    
@app.route('/get-first-image', methods=['GET'])
def get_first_image():
    try:
        # Connect to MySQL
        conn = mysql.connection
        cursor = conn.cursor()

        # Fetch the first image from the table (you can modify the query if needed)
        cursor.execute("SELECT image_data FROM user_images LIMIT 1")
        result = cursor.fetchone()
        cursor.close()

        if result:
            image_data = result[0]
            return Response(image_data, mimetype='image/jpg')  # Adjust mimetype if it's not JPEG
        else:
            return jsonify({'message': 'Image not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'message': 'Failed to fetch image'}), 500


@app.route('/carthandler', methods=['POST'])
def carthandler():
    data = request.json
    name = data['name']
    quantity = data['quantity']
    price = data['price']
    details = data['details']
    
    try:
        quantity = int(quantity)
        price = int(price)
    except ValueError:
        return jsonify({'message': 'Quantity and price must be integers'}), 400

    cur = mysql.connection.cursor()

    # Check if the product already exists in the cart
    cur.execute("SELECT quantity FROM cart WHERE name = %s", (name,))
    existing_product = cur.fetchone()

    if existing_product:
        new_quantity = existing_product[0] + quantity
        cur.execute("UPDATE cart SET quantity = %s WHERE name = %s", (new_quantity, name))
    else:
       
        cur.execute("INSERT INTO cart (name, quantity, price, details) VALUES (%s, %s, %s, %s)", (name, quantity, price, details))

    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'Item added to cart successfully!'}), 200


@app.route('/cartobjects', methods=['GET'])
def cartobjects():
    cur = mysql.connection.cursor()

    # Fetch data from cart table
    cur.execute("SELECT name, quantity, price,details FROM cart")
    cart_data = cur.fetchall()
    cur.close()

    if cart_data:
        data = [{'name': row[0], 'quantity': row[1], 'price': row[2],'details':row[3]} for row in cart_data]
        return jsonify(data), 200
    else:
        return jsonify({'message': 'No data found'}), 404
    
@app.route('/deletefromCart',methods=['DELETE'])
def deletefromCart():
    cur=mysql.connection.cursor()
    data = request.json
    name = data['name']

    cur.execute("delete from cart where name= %s",(name,))
    mysql.connection.commit()
    cur.close()
    
    return jsonify({'message': 'Item deleted from cart successfully!'}), 200

@app.route('/deleteallCart',methods=['DELETE'])
def deleteallCart():
    cur=mysql.connection.cursor()
    cur.execute("TRUNCATE TABLE cart")
    mysql.connection.commit()
    cur.close()
    return jsonify({'message': 'Item deleted from cart successfully!'}), 200


if __name__ == '__main__':
    app.run(debug=True,port=5000)
