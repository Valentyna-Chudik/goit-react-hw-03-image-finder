import { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import GalleryView from './components/GalleryView/GalleryView';

export default class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <GalleryView query={this.state.query} />
      </div>
    );
  }
}
