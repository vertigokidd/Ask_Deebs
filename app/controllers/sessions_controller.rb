class SessionsController < ApplicationController

  def signin
    redirect_to dbc_auth
  end

  def auth
    token = get_oauth_token(params[:code])
    user_data = get_user(token)
    user_attributes = JSON.parse(user_data.body)
    session[:user_attributes] = user_attributes
    session[:oauth_token] = token_as_hash(token)
    redirect_to root_path

  end

  def logout
    session.clear
    redirect_to root_path
  end

  private

  def oauth_client
    raise RuntimeError, "You must set OAUTH_TOKEN and OAUTH_SECRET in your server environment." unless ENV['OAUTH_TOKEN'] && ENV['OAUTH_SECRET']
    OAuth2::Client.new(ENV['OAUTH_TOKEN'], ENV['OAUTH_SECRET'], :site => 'https://auth.devbootcamp.com')
  end

  def dbc_auth
    oauth_client.auth_code.authorize_url(redirect_uri: ENV['OAUTH_REDIRECT'])
  end

  def get_oauth_token(code)
    oauth_client.auth_code.get_token(code, redirect_uri: ENV['OAUTH_REDIRECT'])
  end

  def get_user(token)
    token.get('/me')
  end

  def token_as_hash(token)
  { token: token.token,
    refresh_token: token.refresh_token,
    expires_at: token.expires_at }
  end

end
