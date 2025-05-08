import smtplib
import osfrom email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipartfrom flask import Flask, request, jsonify
app = Flask(__name__)
# Email configuration - replace with your actual email settings
EMAIL_ADDRESS = "mabrukfires@yahoo.com"  # The email address to receive messagesEMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD", "")  # Get password from environment variable for security
SMTP_SERVER = "smtp.mail.yahoo.com"SMTP_PORT = 587
@app.route('/send-message', methods=['POST'])
def send_message():    try:
        # Get form data        name = request.form.get('name')
        email = request.form.get('email')        message_body = request.form.get('message')
                if not all([name, email, message_body]):
            return jsonify({"success": False, "error": "All fields are required"}), 400        
        # Create email        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS        msg['To'] = EMAIL_ADDRESS  # Sending to yourself
        msg['Subject'] = f"New Contact Form Message from {name}"        
        # Email body        body = f"""
        You have received a new message from your website contact form:        
        Name: {name}        Email: {email}
                Message:
        {message_body}        """
                msg.attach(MIMEText(body, 'plain'))
                # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:            server.starttls()  # Secure the connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)            server.send_message(msg)
                return jsonify({"success": True, "message": "Your message has been sent successfully!"}), 200
        except Exception as e:
        print(f"Error sending email: {str(e)}")        return jsonify({"success": False, "error": "Failed to send message. Please try again later."}), 500
# Simple auto-reply function (optional)
def send_auto_reply(recipient_email, recipient_name):    try:
        msg = MIMEMultipart()        msg['From'] = EMAIL_ADDRESS
        msg['To'] = recipient_email        msg['Subject'] = "Thank you for contacting Mabruk Fire Safety"
                body = f"""
        Dear {recipient_name},        
        Thank you for contacting Mabruk Fire Safety. We have received your message and will get back to you as soon as possible.        
        Best regards,        Mabruk Fire Safety Team
        """        
        msg.attach(MIMEText(body, 'plain'))        
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)            server.send_message(msg)
                    return True
    except:        return False
if __name__ == '__main__':
    # For development only - use a proper WSGI server in production
    app.run(debug=True, port=5000)












































