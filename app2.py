from flask import Flask, request, jsonify,Response
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.utils import secure_filename
import smtplib
import random
import os
from dotenv import load_dotenv
import mysql.connector as con
from mysql.connector import Error

app = Flask(__name__)
global_number=0
CORS(app,origins=["https://sparkwave-bfvu.onrender.com"])

load_dotenv()

DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME'),
    'port': os.getenv('DB_PORT', 3306)
}

SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT'))
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

mysql = MySQL(app)

def get_db_connection():
    try:
        connection = con.connect(**DB_CONFIG)
        return connection
    except Error as e:
        print(f"Error connecting to database: {e}")
        return None

@app.route('/submit', methods=['POST'])
def submit():
    # Get database connection
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500
    
    try:
        data = request.json
        
        email = data['email'].strip().lower()
        password = data['password']
        phone = data['phone'].strip()
        
        cur = connection.cursor()
        
        # Check if the email already exists (removed password check for security)
        cur.execute("SELECT * FROM customers WHERE email = %s", (email,))
        existing_user = cur.fetchone()
        
        if existing_user:
            cur.close()
            connection.close()
            return jsonify({'message': 'Email already exists!'}), 400
        
        # Insert the new customer if no conflicts
        cur.execute(
            "INSERT INTO customers (email, password, phone) VALUES (%s, %s, %s)",
            (email, password, phone)
        )
        connection.commit()
        cur.close()
        connection.close()
        
        try:
            send_email(email)
            return jsonify({
                'message': 'Customer added successfully and email sent!',
            }), 200
        
        except Exception as e:
            return jsonify({
                'message': 'Customer added but email failed to send', 
                'error': str(e)
            }), 201
    
    except mysql.connector.Error as e:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred', 'error': str(e)}), 500
    
    except Exception as e:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred', 'error': str(e)}), 500

def send_email(recipient_email):
    subject = "Welcome to Goel Electricals!"
    body = f"Hi there,\n\nThank you for signing up with us!\nYou are just few steps away to complete your profile\n\nRegards,\nGoel Electricals"

    try:
        # Establish connection to the SMTP server
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)  # Login to the email account
            # Construct the email
            message = f"Subject: {subject}\n\n{body}"
            # Send the email
            server.sendmail(EMAIL_ADDRESS, recipient_email, message)
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        raise e

@app.route('/otp_to_email', methods=['POST'])
def otp_to_email():
    # Get database connection
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500
    
    try:
        data = request.json       
        email = data['email'].strip().lower()
        
        cur = connection.cursor()
        
        # Check if the email exists
        cur.execute("SELECT id FROM customers WHERE email = %s", (email,))
        existing_user = cur.fetchone()
        
        if existing_user:
            try:
                send_otp(email)
                cur.close()
                connection.close()
                return jsonify({"message": "OTP sent successfully"}), 200
            except Exception as e:
                cur.close()
                connection.close()
                return jsonify({'message': 'Email failed to send', 'error': str(e)}), 500
        else:
            cur.close()
            connection.close()
            return jsonify({'message': 'Email not registered!'}), 400
    
    except mysql.connector.Error as e:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred', 'error': str(e)}), 500
    
    except Exception as e:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred', 'error': str(e)}), 500

def send_otp(recipient_email):
    subject = "Goel Electricals"
    global random_number
    random_number = random.randint(100000, 999999)
    body = f"Hi there,\n\nThis is your OTP for your password setup process.\n{random_number}\n\nRegards,\nGoel Electricals"

    try:
        # Establish connection to the SMTP server
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Upgrade the connection to a secure encrypted SSL/TLS connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)  # Login to the email account
            # Construct the email
            message = f"Subject: {subject}\n\n{body}"
            # Send the email
            server.sendmail(EMAIL_ADDRESS, recipient_email, message)
    except Exception as e:
        print(f"OTP email sending failed: {str(e)}")
        raise e

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
    # Get database connection
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500
    
    try:
        data = request.json
        
        # Check if required fields are present
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Email and password are required'}), 400
        
        email = data['email'].strip().lower()
        password = data['password']
        
        # Create cursor and execute query
        cur = connection.cursor(dictionary=True)
        cur.execute("SELECT  email, phone FROM customers WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()
        cur.close()
        connection.close()
        
        if user:
            return jsonify({
                'message': 'Login successful!',
                'user': {
                    'email': user['email'],
                    'phone': user['phone'],
                }
            }), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    
    except mysql.connector.Error as e:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred'}), 500
    
    except Exception as e:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred'}), 500
    
@app.route('/set_new_password', methods=['POST'])
def set_new_password():
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        data = request.json
        if not data or 'email' not in data or 'new_password' not in data:
            return jsonify({'message': 'Email and new password are required'}), 400

        email = data['email'].strip().lower()
        new_password = data['new_password']

        cur = connection.cursor()
        cur.execute("UPDATE customers SET password = %s WHERE email = %s", (new_password, email))
        connection.commit()
        cur.close()
        connection.close()

        return jsonify({'message': "New password has been set up."}), 200

    except mysql.connector.Error:
        if connection:
            connection.close()
        return jsonify({'message': "Database error occurred."}), 500

    except Exception:
        if connection:
            connection.close()
        return jsonify({'message': "An unexpected error occurred."}), 500



@app.route('/profile', methods=['POST'])
def profile():
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        data = request.json
        name = data['Name']
        age = data['Age']
        state = data['State']
        district = data['District']
        dob = data['DOB']
        email = data['userEmail'].strip().lower()

        cur = connection.cursor()
        cur.execute("SELECT * FROM customers WHERE email = %s", (email,))
        if not cur.fetchone():
            cur.close()
            connection.close()
            return jsonify({'message': 'User not found!'}), 404

        cur.execute(
            "INSERT INTO profile (email, name, age, state, district, dob) VALUES (%s, %s, %s, %s, %s, %s)",
            (email, name, age, state, district, dob)
        )
        connection.commit()
        cur.close()
        connection.close()

        return jsonify({'message': 'Customer profile added successfully!'}), 200

    except mysql.connector.Error:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred.'}), 500

    except Exception:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred.'}), 500


@app.route('/combined-data/<email>', methods=['GET'])
def combined_data(email):
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cur = connection.cursor()

        # Fetch data from customers table
        cur.execute("SELECT * FROM customers WHERE email = %s", (email,))
        customer_data = cur.fetchone()

        if customer_data:
            # Fetch data from profile table
            cur.execute("SELECT * FROM profile WHERE email = %s", (email,))
            profile_data = cur.fetchone()
            cur.close()
            connection.close()

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
        connection.close()
        return jsonify({'message': 'No data found'}), 404

    except mysql.connector.Error:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred'}), 500

    except Exception:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred'}), 500
    
@app.route('/upload-image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400

    file = request.files['file']
    email = request.form.get('email')
    if file.filename == '' or not email:
        return jsonify({'message': 'Email and file are required'}), 400

    file_binary = file.read()
    filename = file.filename

    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor()

        # Check if email exists
        cursor.execute("SELECT email FROM user_images WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            query = "UPDATE user_images SET filename = %s, image_data = %s WHERE email = %s"
            cursor.execute(query, (filename, file_binary, email))
        else:
            query = "INSERT INTO user_images (email, filename, image_data) VALUES (%s, %s, %s)"
            cursor.execute(query, (email, filename, file_binary))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({'message': 'File uploaded successfully'}), 200

    except mysql.connector.Error:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred'}), 500

    except Exception:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred'}), 500

    
@app.route('/get-first-image/<email>', methods=['GET'])
def get_first_image(email):
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cursor = connection.cursor()
        cursor.execute("SELECT image_data FROM user_images WHERE email = %s", (email,))
        result = cursor.fetchone()
        cursor.close()
        connection.close()

        if result:
            image_data = result[0]
            return Response(image_data, mimetype='image/jpeg')  # Adjust if not JPEG
        else:
            return jsonify({'message': 'Image not found'}), 404

    except mysql.connector.Error:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred'}), 500

    except Exception:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred'}), 500

@app.route('/carthandler', methods=['POST'])
def carthandler():
    data = request.json
    email = data['userEmail']
    name = data['name']
    quantity = data['quantity']
    price = data['price']
    details = data['details']

    try:
        quantity = int(quantity)
        price = int(price)
    except ValueError:
        return jsonify({'message': 'Quantity and price must be integers'}), 400

    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cur = connection.cursor()
        cur.execute("SELECT quantity FROM cart WHERE email = %s AND name = %s", (email, name))
        existing_product = cur.fetchone()

        if existing_product:
            new_quantity = existing_product[0] + quantity
            cur.execute("UPDATE cart SET quantity = %s WHERE email = %s AND name = %s",
                        (new_quantity, email, name))
        else:
            cur.execute("INSERT INTO cart (email, name, quantity, price, details) VALUES (%s, %s, %s, %s, %s)",
                        (email, name, quantity, price, details))

        connection.commit()
        cur.close()
        connection.close()

        return jsonify({'message': 'Item added to cart successfully!'}), 200

    except mysql.connector.Error:
        if connection:
            connection.close()
        return jsonify({'message': 'Database error occurred'}), 500

    except Exception:
        if connection:
            connection.close()
        return jsonify({'message': 'An unexpected error occurred'}), 500


@app.route('/cartobjects/<email>', methods=['GET'])
def cartobjects(email):
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cur = connection.cursor()
        cur.execute("SELECT name, quantity, price, details FROM cart WHERE email = %s", (email,))
        cart_data = cur.fetchall()
        cur.close()
        connection.close()

        if cart_data:
            data = [{'name': row[0], 'quantity': row[1], 'price': row[2], 'details': row[3]} for row in cart_data]
            return jsonify(data), 200
        else:
            return jsonify({'message': 'No data found'}), 404
    except:
        connection.close()
        return jsonify({'message': 'Failed to fetch cart data'}), 500
    
    
@app.route('/deletefromCart/<email>', methods=['DELETE'])
def deletefromCart(email):
    data = request.json
    name = data['name']

    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cur = connection.cursor()
        cur.execute("DELETE FROM cart WHERE name = %s AND email = %s", (name, email))
        connection.commit()
        cur.close()
        connection.close()
        return jsonify({'message': 'Item deleted from cart successfully!'}), 200
    except:
        connection.close()
        return jsonify({'message': 'Failed to delete item from cart'}), 500

@app.route('/deleteallCart/<email>', methods=['DELETE'])
def deleteallCart(email):
    connection = get_db_connection()
    if not connection:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        cur = connection.cursor()
        cur.execute("DELETE FROM cart WHERE email = %s", (email,))
        connection.commit()
        cur.close()
        connection.close()
        return jsonify({'message': 'All items deleted from cart successfully!'}), 200
    except:
        connection.close()
        return jsonify({'message': 'Failed to delete all items from cart'}), 500



if __name__ == '__main__':
    app.run(debug=True,port=5000)
