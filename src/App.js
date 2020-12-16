import { Component } from 'react';

import Container from './components/Container/Container';
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
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <GalleryView query={this.state.query} />
      </Container>
    );
  }
}
