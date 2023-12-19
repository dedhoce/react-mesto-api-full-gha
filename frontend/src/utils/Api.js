import { BaseApi } from "./BaseApi";

class Api extends BaseApi{ 

  _getHeaders(localJWT) {
    return {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${localJWT}`
  }
  }

  getUserInfo(localJWT) {    
    return this._request('/users/me', {
      headers: this._getHeaders(localJWT)      
    })                
  }  

  pushUserInfo({name, about}, localJWT) {    
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._getHeaders(localJWT),
      body: JSON.stringify({
        name,
        about
      })
    })    
  }

  pushAvatar({avatar}, localJWT) {
    console.log(avatar)        
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this._getHeaders(localJWT),
      body: JSON.stringify({
        avatar: avatar        
      })
    })     
  }

  getInitialCards(localJWT) {    
    return this._request('/cards', {
      headers: this._getHeaders(localJWT)      
    })                
  }

  deleteCard(cardId, localJWT) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(localJWT)      
    })    
  }

  pushInfoCreateCard({name, url}, localJWT) {    
    return this._request('/cards', {
      method: 'POST',
      headers: this._getHeaders(localJWT),
      body: JSON.stringify({
        name: name,
        link: url         
      })
    })    
  }  

  _likeCard(cardId, localJWT) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(localJWT)      
    })      
  }

  _deleteLikeCard(cardId, localJWT) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(localJWT)      
    })    
  }

  changeLikeCardStatus(cardId, likeStatus, localJWT) {
    if(likeStatus) {
      return this._likeCard(cardId, localJWT)
    }
    return this._deleteLikeCard(cardId, localJWT)
  } 
}

const api = new Api({
  baseUrl: "https://api.mesto.amelitskov.nomoredomainsmonster.ru",
  //baseUrl: 'http://localhost:3000',  
});

export default api




