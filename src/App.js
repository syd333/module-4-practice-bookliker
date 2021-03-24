import React from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";

const axios = require('axios').default;
const currUser = {"id":1, "username":"pouros"}


class App extends React.Component {

  state = {
    books: [],
    selectedBook: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => 
      this.setState({
        books: data
      })
    )
  }

  selectBook = (book) => {
    this.setState({
     selectedBook: book
    })
  }


  likeBook = (book) => {
    // let body = ""
    // if (book.users.some(user => user.id === 1)) {
    //   body = {
    //     "users": book.users.filter(user => user.id !== 1)
    //   }
    // } else {
    //   body = {
    //     "users": [...book.users, {"id":1, "username":"pouros"}]
    //   }
    // }
    // let reqPack = {}
    //     reqPack.headers = {"Content-Type": "application/json"}
    //     reqPack.method = "PATCH"
    //     reqPack.body = JSON.stringify(body)
    // fetch(`http://localhost:3000/books/${book.id}`, reqPack)
    // .then(updatedBook => this.setState({books: this.state.books.map(book => book.id === updatedBook.id ? updatedBook : book), selectedBook: updatedBook}))
      let updatedUsers
      const currentLikes = this.state.selectedBook.users.map(user=> user.id)
        if (!currentLikes.includes(currUser.id)){
          updatedUsers = [...this.state.selectedBook.users, currUser]
          console.log(updatedUsers)
       } else {
        updatedUsers = this.state.selectedBook.users.filter( user => user.id !== currUser.id)
      }
   axios.patch(`http://localhost:3000/books/${book.id}`, {users: updatedUsers} )
       .then(res => {
       this.selectBook(res.data)
    })
  }


  render () {
  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
    
         <Menu vertical inverted>
         {this.state.books.map(book => {
         return (
          <Menu.Item as={"a"} onClick={() => this.selectBook(book)}>
            {book.title}
          </Menu.Item>
         )}
         )}
        </Menu>
           
        <Container text>
          <Header>{this.state.selectedBook.title}</Header>
          <Image
            src={this.state.selectedBook.img_url}
            size="small"
          />

          <p>{this.state.selectedBook.description}</p>
          {this.state.selectedBook ? 
          <Button onClick={() => this.likeBook(this.state.selectedBook)}
            color="red"
            content="Like"
            icon="heart"
            label={{
              basic: true,
              color: "red",
              pointing: "left",
              content: this.state.selectedBook.users.length
            }}
          /> :
          null
          }

         {this.state.selectedBook ? <Header>Liked by </Header> : null }
          <List>
            {this.state.selectedBook ? this.state.selectedBook.users.map(user =>  <List.Item icon="user" content= {user.username} />): null}
          </List>
        </Container>
      </main>
    </div>
  );
}
}

export default App;
