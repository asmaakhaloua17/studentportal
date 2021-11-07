import React, { Component } from 'react'

export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
       
    this.state = { selectedColour :""
    };
    this.props.onSelectcolor(this.state.selectedColour);
}
    setSelectedColour(colour) {
		this.setState({ selectedColour: colour });
	}
    render() {
        const defaultColours = [
            '#FF1654',
            '#247BA0',
            '#70C1B3',
            '#92b300',
            '#CBB1DB',
            '#C1BF70',
            '#add8e6',
            '#ffc1cb',
            '#67d8f3',
            '#f3af67'
        ];
        
        return (
           
         
            <ul className="icons">
                {defaultColours.map((colour, index) => {
                    return (
                        <li key={index} onClick={() =>{ this.setSelectedColour(colour);   this.props.onSelectcolor(colour);}}>
                            <span className={`dot color border-radius ${this.state.selectedColour === colour ? 'selected' : ''}`} style={{ backgroundColor: colour}}></span>
                        </li>
                    );
                })}
            </ul>
        )
    }
}
