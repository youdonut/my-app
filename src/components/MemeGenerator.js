import React, { Component } from 'react';
import styles from './MemeGenerator.module.css'

class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "https://i.imgflip.com/1ur9b0.jpg",
            allMemeImgs: []
        }
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                let boxCount = memes.filter(e => e.box_count === 2)
                this.setState({ allMemeImgs: boxCount })
            })
    }
    // Change to use arrow functions
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({
            randomImg: randMemeImg
        })
    }

    render() {
        return (
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={this.handleSubmit}>
                    <input name="topText" type="text" placeholder="Top Text" value={this.state.topText} onChange={this.handleChange} />
                    <input name="bottomText" type="text" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.handleChange} />
                    <button>Generate</button>
                </form>
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <img src={this.state.randomImg} alt="" />
                        <h1 className={styles.topText}>{this.state.topText}</h1>
                        <h1 className={styles.bottomText}>{this.state.bottomText}</h1>
                    </div>
                </div>

            </div>
        );
    }
}

export default MemeGenerator;