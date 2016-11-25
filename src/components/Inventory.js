import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base'

class Inventory extends React.Component {
  constructor(){
    super()
    self = this;
    this.renderLogin.bind(this)
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount(){
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user})
      }
    })
  }

  handleChange(e, key){
    const fish = self.props.fishes[key];
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
     }
     console.log(self.props);
     self.props.updateFish(key, updatedFish)
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, self.authHandler);
  }

  logout(){
    base.unauth();
    self.setState({uid: null});
  }

  authHandler(err, authData){
    console.log(authData);
    if (err) {
      console.error(err);
      return;
    }
    //grab the store info
    const storeRef = base.database().ref(self.props.storeId)
    //query firebase once for store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      //claim it if there is no owner
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }
      self.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })

    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manaage your inventory</p>
        <button className="github" onClick={() => self.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => self.authenticate('facebook')}>Log In with Facebook</button>
        <button className="twitter" onClick={() => self.authenticate('twitter')}>Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key){
    const fish = self.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => self.handleChange(e, key)}/>
        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => self.handleChange(e, key)}/>
        <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => self.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc}placeholder="Fish Desc" onChange={(e) => self.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image}placeholder="Fish Image" onChange={(e) => self.handleChange(e, key)}/>
        <button onClick={() => {self.props.removeFish(key)}} >Remove Fish</button>
    </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log out!</button>
    //check if not logged in
    if(!this.state.uid) {
      return (<div>{this.renderLogin()}</div>)
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of this store</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired,

}

export default Inventory
