FROM httpd:2.4-alpine

# Copy project files to Apache document root
COPY . /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80
