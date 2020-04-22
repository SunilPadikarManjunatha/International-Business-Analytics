# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, session
import json
import os
#from scripts import commmon_functions
from scripts import IBA_Prototype
app = Flask(__name__)
app.secret_key = os.urandom(12)  # Generic key for dev purposes only

# ======== Routing =========================================================== #
# -------- Login ------------------------------------------------------------- #
@app.route('/', methods=['GET', 'POST'])
def search():
    print('search')
    #if not session.get('logged_in'):
        #form = forms.LoginForm(request.form)
    if request.method == 'POST':
        country = request.form['country']
        back_pref = request.form['back_pref']
        skill_pref = request.form['skill_pref']
        print(country)
        print(back_pref)
        print(skill_pref)
        #recom = IBA_Prototype.process_data(country,skill_pref,back_pref)
        #IBA_Prototype.read_data()
        recom = IBA_Prototype.process_data(country,skill_pref,back_pref)
        print(recom)
        return json.dumps({'status': recom.to_json(orient='records')})
        #return render_template('home.html', user=user)
        #if form.validate():
        #    if helpers.credentials_valid(username, password):
        #        session['logged_in'] = True
        #        session['username'] = username
        #        return json.dumps({'status': 'Login successful'})
        #    return json.dumps({'status': 'Invalid user/pass'})
        #return json.dumps({'status': 'Both fields required'})
    elif not session.get('readdata'):
        print("Read Data")
        IBA_Prototype.read_data()
        session['readdata'] = True
    return render_template('login.html', form='')


"""@app.route("/logout")
def logout():
    session['logged_in'] = False
    return redirect(url_for('login'))


# -------- Signup ---------------------------------------------------------- #
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if not session.get('logged_in'):
        form = forms.LoginForm(request.form)
        if request.method == 'POST':
            username = request.form['username'].lower()
            password = helpers.hash_password(request.form['password'])
            email = request.form['email']
            if form.validate():
                if not helpers.username_taken(username):
                    helpers.add_user(username, password, email)
                    session['logged_in'] = True
                    session['username'] = username
                    return json.dumps({'status': 'Signup successful'})
                return json.dumps({'status': 'Username taken'})
            return json.dumps({'status': 'User/Pass required'})
        return render_template('login.html', form=form)
    return redirect(url_for('login'))


# -------- Settings ---------------------------------------------------------- #
@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if session.get('logged_in'):
        if request.method == 'POST':
            password = request.form['password']
            if password != "":
                password = helpers.hash_password(password)
            email = request.form['email']
            helpers.change_user(password=password, email=email)
            return json.dumps({'status': 'Saved'})
        user = helpers.get_user()
        return render_template('settings.html', user=user)
    return redirect(url_for('login'))

"""
# ======== Main ============================================================== #
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
