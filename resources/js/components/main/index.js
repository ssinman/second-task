import React, { Component } from 'react';
import Form from '../form/';
import List from '../list/';
import './style.css';

export default class index extends Component {
    constructor(props){
        super(props);

        this.state = {
            'showForm' : true,
            'showList' : false,
            'showEdit' : false,
            'showSingleProduct' : false,
            'recordId' : 0,
        }
    }
    togglePage = (page, id)=>{
        console.log('PAGE:',page);
        console.log('ID:',id);
        if ( page == 'Form' ) {
            this.setState({
                'showForm' : true,
                'showList' : false,
                'showEdit' : false,
                'showSingleProduct' : false,
            });
        } else
        if ( page == 'List' ) {
            this.setState({
                'showForm' : false,
                'showList' : true,
                'showEdit' : false,
                'showSingleProduct' : false,
            });
        } else
        if ( page == 'Edit' ) {
            this.setState({
                'showForm' : false,
                'showList' : false,
                'showEdit' : true,
                'showSingleProduct' : false,
                'recordId': id,
            });
        }
    }
    render() {
        const form = this.state.showForm ? <Form togglepage={this.togglePage} mode="create"/> : undefined;
        const list = this.state.showList ? <List togglepage={this.togglePage}/> : undefined;
        const edit = this.state.showEdit ? <Form togglepage={this.togglePage} mode="edit" record={this.state.recordId}/> : undefined;
        return (
            <main className="main section-width">
                {form}
                {list}
                {edit}
            </main>
        )
    }
}
