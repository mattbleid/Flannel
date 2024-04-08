import csv
import mysql.connector

# THIS IS NOT A FULLY WORKING FUNCTION, IT JUST IS A BASELINE UNTIL WE CAN IMPLEMENT THE EXISTING FILES

db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="FlaNNel24!",
    database="flannelemotiondata"
)
db_cursor = db_connection.cursor()

# Queries db for emotion data
query = "SELECT * FROM student_emotion_capture WHERE capture_date = CURDATE()"
db_cursor.execute(query)
emotions_data = db_cursor.fetchall()

# Creates the CSV file
csv_filename = "emotion_data.csv"
with open(csv_filename, 'w', newline='') as csvfile:
    fieldnames = ['student_id', 'last_name', 'first_name', 'emotion', 'capture_date']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for row in emotions_data:
        writer.writerow({
            'student_id': row[0],
            'last_name': row[1],
            'first_name': row[2],
            'emotion': row[3],
            'capture_date': row[4]
        })

# Close db connection
db_cursor.close()
db_connection.close()
