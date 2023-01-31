import os

from flask import Flask, request, jsonify, render_template, redirect, url_for,send_file
from faker import Faker
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant
from werkzeug.utils import secure_filename

app = Flask(__name__)
fake = Faker()


@app.route('/')
def index():
    return render_template('index.html')

# Add your Twilio credentials
@app.route('/token')
def generate_token():
    TWILIO_ACCOUNT_SID="AC3865aede405936ff37d9137d4a28c10c"
    TWILIO_SYNC_SERVICE_SID="ISce2a41d15a4d2aa7b98f5ba3fe3d5f8b"
    TWILIO_API_KEY="SKd52dca743d2f2a422b8be1ee2a9ba0a8"
    TWILIO_API_SECRET="asDdm711cxIvl4mW2pQAhPLrya47XHd3"
    username = request.args.get('username', fake.user_name())

    # create access token with credentials
    token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, identity=username)
    # create a Sync grant and add to token
    sync_grant_access = SyncGrant(TWILIO_SYNC_SERVICE_SID)
    token.add_grant(sync_grant_access)
    return jsonify(identity=username, token=token.to_jwt().decode())

# Write the code here
@app.route('/', methods=['POST'])
def download_text():
    file1=request.form['text']
    with open("workfile.txt","w") as f:
        f.write(file1)
    path_file="workfile.txt"
    return send_file(path_file,as_attachment=True)

    

    


if __name__ == "__main__":
    app.run(host='localhost', port='5001', debug=True)
