# Use the official Python image from Docker Hub
FROM python:3.8-slim

# Set the working directory
WORKDIR /app

# Copy the necessary files to the container
COPY app.py /app
COPY model.h5 /app  

# Install required dependencies
RUN pip install --no-cache-dir flask tensorflow pillow numpy

# Expose the port the app will run on
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
