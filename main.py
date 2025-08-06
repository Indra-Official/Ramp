from flask import Flask, render_template, request, jsonify
 
app = Flask(__name__)


Data_set = None

@app.route("/", methods = ["POST", "GET"])
def Index():
    return render_template("Home.html")

@app.route("/Chat", methods = ["POST", "GET"])
def Jee():
    return render_template("Chat.html")

@app.route("/Data_Set", methods = ["POST", "GET"])
def Send_Data():
    return jsonify(Data_set)

@app.route("/Save_Recieve", methods = ["POST", "GET"])
def Recieve_Question_Type():
    data = request.get_json()
    data = (data.get('data'))
    print(data)
    Data_set [data["Question-Type"]] [data['Subject']] [data["Question-No"]] = [data['Answered'], data['Answer-Type']] 
    print(Data_set)
    return jsonify(Data_set)

@app.route("/Save_Choice", methods = ["POST", "GET"])
def Save_Choice():
    data = request.get_json()
    data = (data.get('data'))
    print(data)
    Data_set [data["Question-Type"]] [data['Subject']] [data["Question-No"]] = [data['Answered'], data['Answer-Type']]
    return ['0']


if __name__ == "__main__":
    app.run(debug=True,port=5500)