FROM python:3.6

RUN git clone https://github.com/gpodder/mygpo.git /usr/src/app
WORKDIR /usr/src/app

RUN pip install -r requirements.txt
RUN SECRET_KEY='irrelevant' python manage.py collectstatic

# Add whitenoise for simple static file hosting
RUN pip install whitenoise
RUN echo 'MIDDLEWARE.append("whitenoise.middleware.WhiteNoiseMiddleware")' >> mygpo/settings.py
# Turn off async
RUN echo 'API_ACTIONS_BG_HANDLER = None' >> mygpo/settings.py
