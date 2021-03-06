import React from 'react';
import {getFunName} from '../helpers'

class StorePicker extends React.Component {
  constructor(){
    super();
    this.goToStore = this.goToStore.bind(this); //Makes "this" inside of goToStore refer to StorePicker
  }

  goToStore(e) {
    e.preventDefault();
    const storeId = this.storeInput.value;
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Ugh jsx comments are ugly */}
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>  {/*random name and on submission gives a property storeInput to StorePicker whose value is this input html element */}
        <button type="submit">Visit store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object //surface the router from the parent using contextTypes
}

export default StorePicker
