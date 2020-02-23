import React, { Component } from "react";
import profiles from "./data/berlin.json";

let IdCard = props => {
  return (
    <div>
      <img src={props.picture} alt="profile-pic" />
      <ul>
        <li>First Name: {props.firstName}</li>
        <li>Last Name: {props.lastName}</li>
        <li>Gender: {props.gender}</li>
        <li>Height: {props.height}</li>
        <li>Birth: {props.birth.toDateString()}</li>
      </ul>
    </div>
  );
};

let Greetings = props => {
  let greeting = "";
  if (props.lang == "de") {
    greeting += "Hallo";
  } else if (props.lang == "fr") {
    greeting += "Bonjour";
  } else if (props.lang == "es") {
    greeting += "Hola";
  } else if (props.lang == "en") {
    greeting += "Hello";
  }
  return (
    <p>
      {greeting} {props.children}
    </p>
  );
};

let Random = props => {
  let randomNum = Math.floor(
    Math.random() * (props.max + 1 - props.min) + props.min
  );
  return (
    <p>
      Random value between {props.min} and {props.max} => {randomNum}
    </p>
  );
};

let BoxColor = props => {
  let style = {
    border: "1px solid black",
    height: "100px",
    color: "white",
    backgroundColor: `rgb(${props.r}, ${props.g}, ${props.b})`
  };
  return (
    <p style={style}>
      rgb({props.r},{props.g},{props.b})
    </p>
  );
};

let CreditCard = props => {
  let imageURL;
  if (props.type == "Visa") {
    imageURL = "../public/img/visa.png";
  } else {
    imageURL = "../public/img/master-card.svg";
  }
  let style = {
    backgroundColor: props.bgColor,
    height: "150px",
    width: "300px"
  };
  return (
    <div style={style}>
      <img src={imageURL} alt="credit-card-comp" />
    </div>
  );
};

class LikeButton extends React.Component {
  state = {
    count: 0
  };
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  render() {
    return <button onClick={this.handleClick}>{this.state.count} Likes</button>;
  }
}

class ClickablePicture extends React.Component {
  state = {
    image: this.props.img
  };

  togglePic = () => {
    if (this.state.image === this.props.img) {
      this.setState({
        image: this.props.imgClicked
      });
    } else if (this.state.image === this.props.imgClicked) {
      this.setState({
        image: this.props.img
      });
    }
  };

  render() {
    return <img onClick={this.togglePic} src={this.state.image} alt="image" />;
  }
}

class Dice extends React.Component {
  // constructor(randomNum) {
  //   this.randomNum = Math.floor(Math.random() * 6 + 1);
  // }
  state = {
    image: `/img/dice${Math.floor(Math.random() * 6 + 1)}.png`
  };

  handleClick = () => {
    this.setState({
      image: "/img/dice-empty.png"
    });

    setTimeout(() => {
      this.setState({
        image: `/img/dice${Math.floor(Math.random() * 6 + 1)}.png`
      });
    }, 1000);
  };
  render() {
    return (
      <img
        onClick={this.handleClick}
        style={{ width: "150px" }}
        src={this.state.image}
        alt=""
      />
    );
  }
}

let NumbersTable = props => {
  let styleContainer = {
    display: "flex"
  };

  let styleEvens = {
    width: "100px",
    border: "1px solid black",
    textAlign: "center",
    padding: "3% 0",
    backgroundColor: "red"
  };

  let styleOdds = {
    width: "100px",
    border: "1px solid black",
    textAlign: "center",
    padding: "3% 0"
  };

  let numArr = [];

  for (let i = 1; i <= props.limit; i++) {
    numArr.push(
      i % 2 === 0 ? (
        <div style={styleEvens}>{i}</div>
      ) : (
        <div style={styleOdds}>{i}</div>
      )
    );
  }

  return <div style={styleContainer}>{numArr}</div>;
};

//need to add unique keys to each document
let FaceBook = props => {
  return profiles.map(profile => {
    return (
      <div>
        <img src={profile.img} alt="profile-pic" />
        <ul>
          <li>First Name: {profile.firstName}</li>
          <li>Last Name: {profile.lastName}</li>
          <li>Country: {profile.country}</li>
          {profile.isStudent ? <li>Type: Student</li> : <li>Type: Teacher</li>}
        </ul>
      </div>
    );
  });
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>IdCard</h1>
        <IdCard
          lastName="Doe"
          firstName="John"
          gender="male"
          height={178}
          birth={new Date("1992-07-14")}
          picture="https://randomuser.me/api/portraits/men/44.jpg"
        />
        <IdCard
          lastName="Delores "
          firstName="Obrien"
          gender="female"
          height={172}
          birth={new Date("1988-05-11")}
          picture="https://randomuser.me/api/portraits/women/44.jpg"
        />
        <h1>Greetings</h1>
        <Greetings lang="de">Ludwig</Greetings>
        <Greetings lang="fr">François</Greetings>
        <h1>Random</h1>
        <Random min={1} max={6} />
        <Random min={1} max={100} />
        <h1>Box Color</h1>
        <BoxColor r={255} g={0} b={0} />
        <BoxColor r={128} g={255} b={0} />
        <h1>Credit Card</h1>
        <CreditCard
          type="Visa"
          number="0123456789018845"
          expirationMonth={3}
          expirationYear={2021}
          bank="BNP"
          owner="Maxence Bouret"
          bgColor="#11aa99"
          color="white"
        />
        <CreditCard
          type="Master Card"
          number="0123456789010995"
          expirationMonth={3}
          expirationYear={2021}
          bank="N26"
          owner="Maxence Bouret"
          bgColor="#eeeeee"
          color="#222222"
        />
        <CreditCard
          type="Visa"
          number="0123456789016984"
          expirationMonth={12}
          expirationYear={2019}
          bank="Name of the Bank"
          owner="Firstname Lastname"
          bgColor="#ddbb55"
          color="white"
        />

        <h1>Like Button</h1>
        <LikeButton />
        <LikeButton />

        <h1>Clickable Picture</h1>
        <ClickablePicture
          img="/img/persons/maxence.png"
          imgClicked="/img/persons/maxence-glasses.png"
        />

        <h1>Dice</h1>
        <Dice />

        <h1>Number Table</h1>
        <NumbersTable limit={12} />

        <h1>Facebook</h1>
        <FaceBook />
      </div>
    );
  }
}

export default App;
