import firebase from 'firebase/app'

// Optionally import the services that you want to use
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDuX7_Tqtp-CPnmOgpWtQXE-T0zwX8YTeM',
  authDomain: 'hiddenchessgame.firebaseapp.com',
  databaseURL: 'https://hiddenchessgame.firebaseio.com',
  projectId: 'hiddenchessgame',
  storageBucket: 'hiddenchessgame.appspot.com',
  messagingSenderId: '1040915402329',
  appId: '1:1040915402329:web:493ebe219a5fc4bb166b48',
}
if (!firebase.apps.length) {
  firebase
    .initializeApp(firebaseConfig)
    .auth()
    .onAuthStateChanged((user) => {
      if (user != null) {
        console.log('We are authenticated now!')
      }

      // Do other things
    })
} else {
  firebase.app() // if already initialized, use that one
}

const Home: React.FC = () => {
  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .then(({ user }) => {
        // Signed in..
        console.log(`==== user ===`)
        console.log(user.uid)
        console.log('==== end log ===')
      })
      .catch((error) => {
        // ...
        console.log(`==== error ===`)
        console.log(error)
        console.log('==== end log ===')
      })
  }, [])
  return (
    <Wrapper>
      <Rotate>&lt; hoang the hung &gt;</Rotate>
      <Title>Next top dev</Title>
      <Button primary>Login with Github</Button>
      <TomatoButton>Tomato Button</TomatoButton>
      <Example>Hello world!</Example>
    </Wrapper>
  )
}
// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
  display: flex;
  flex-direction: column;
`

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`

const Button = styled.button<{ primary?: boolean }>`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`

const Example = styled.div`
  /* all declarations will be prefixed */
  padding: 2em 1em;
  background: papayawhip;

  /* pseudo selectors work as well */
  &:hover {
    background: palevioletred;
  }

  /* media queries are no problem */
  @media (max-width: 600px) {
    background: tomato;

    /* nested rules work as expected */
    &:hover {
      background: yellow;
    }
  }

  > p {
    /* descendant-selectors work as well, but are more of an escape hatch */
    text-decoration: underline;
  }

  /* Contextual selectors work as well */
  html.test & {
    display: none;
  }
`

export default Home
