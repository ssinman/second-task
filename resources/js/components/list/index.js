import React, { Component } from 'react'
import './style.css';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'records' : [],
        }
    }
    getRecords = async ()=>{
        let request = await fetch('/api', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*' ,
                /* 'Content-Type': 'application/json' */
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                records: response,
            });
        });
    }
    componentDidMount(){
        this.getRecords();
    }
    render() {
        const records_list = this.state.records.map((element, index)=>{
            /* if(!element.image.startsWith('http'))
                element.image = 'storage/'+element.image; */
                element.created_at = element.created_at.split('T')[0];
            return (
                <div className="records-list__item" key={'records-list__item-'+element.id} onClick={()=>{this.props.togglepage('Edit', element.id)}}>
                    <div className="records-list__item-image"><img src={element.image}/></div>
                    <div className="records-list__item-title">{element.title}</div>
                    <div className="records-list__item-desc">{element.description}</div>
                    <div className="records-list__item-author">{element.author}</div>
                    <div className="records-list__item-date">{element.created_at}</div>
                </div>
            )
        });
        return (
            <>
                <button className="button__show-records-list" onClick={()=>{this.props.togglepage('Form')}}>Показать форму добавления</button>
                <div className="records-list">

                    {records_list}
                </div>
            </>
        )
    }
}
