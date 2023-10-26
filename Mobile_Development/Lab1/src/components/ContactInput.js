import React from "react";
import ContactDetails from "./ContactDetails";

class ContactInput extends React.Component // extend creates a child class from the mentioned parent class
{
    constructor(props) {
        super(props) // super : invoke parent class properties

        // Create a state
        this.state = {   // this.state is a hook
            name: '',
            number: '',
            ContactAdded: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.addContactDetails = this.addContactDetails.bind(this)
        this.resetContactDetails = this.resetContactDetails.bind(this);
    }

    handleChange(event) {
        const value = event.target.value; // value changed on event change
        const name = event.target.name; //

        this.setState({
            [name]: value
        })
    }

    addContactDetails() {
        this.setState({
            ContactAdded: true,
        })
    }

    resetContactDetails() {
        this.setState({
          name: '',
          number: '',
          ContactAdded: false,
        });
    }

    render() {
        return (
            <div>
                <h1>Please enter your Contact Details</h1>
                <div>
                    Name :
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} disabled ={this.state.ContactAdded}></input>
                </div>
                <div>
                    Telephone Number :
                    <input type="text" name="number" value={this.state.number} onChange={this.handleChange} disabled={this.state.ContactAdded}></input>
                </div>
                <button onClick={this.addContactDetails}>Add Contact</button>
                <button onClick={this.resetContactDetails}>Reset</button>

                {
                    this.state.ContactAdded &&
                    <div>
                        <ContactDetails name={this.state.name} number={this.state.number} />
                    </div>
                }
            </div>
        );
    }
}

export default ContactInput;
