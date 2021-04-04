import React, {Component} from "react";
import PropTypes from 'prop-types';
import shortid from 'shortid'
import s from './ContactForm.module.css'

class ContactForm extends Component {
    state = {
    name: "",
    number: ""
    }

    nameInputId = shortid.generate();
    numberInputId = shortid.generate();

    handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
    };
    
    handleSubmit = (e) => {
    e.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };
    
    reset = () => {
        this.setState({name: "",
    number: ""})
    }
    render() {
        return (
            < form onSubmit={this.handleSubmit} >
                <div className={s.form}>
                <label className={s.label} htmlFor={this.nameInputId}>
                    Name
              <input className={s.input}
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        id={this.nameInputId}
                    />
                </label>
                <label className={s.label} htmlFor={this.numberInputId}>
                    Number
              <input className={s.input}
                        type="text"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
                        id={this.numberInputId}
                    />
                </label>
                    <button className={s.button} type="submit">Add contact</button>
                     </div>
            </form >
                
        );
    }
}

ContactForm.defaultProps = {
    type: 'text',
    name: null,
};

ContactForm.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
};

export default ContactForm;