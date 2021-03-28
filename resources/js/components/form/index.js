import { stubString } from 'lodash';
import React, { Component } from 'react'
import './style.css';

export default class index extends Component {
    constructor(props){
        super(props);

        this.state = {
            'form_action': '/api',
            'method': 'POST',
            'form_result': '',
            'form_title': 'Добавление новой записи',
            'id': 0,
            'title': '',
            'author': '',
            'image': '',
            'description': '',
            'showImage': 'none',
            'showSubmit': 'block',
            'showDelete': 'none',
        }
    }
    componentDidMount(){
        if (this.props.record > 0) {
            this.getRecordData(this.props.record);

            this.setState({
                'id': this.props.record,
                form_title: 'Редактирование записи #'+this.props.record,
                method: 'PUT',
                form_action: '/api/'+this.props.record,
                showImage: 'block',
                showDelete: 'block',
            });
        }
    }
    togglePage = (page, id)=> {
        this.props.togglepage(page, id);
    }
    changeValueOfInput = (e,state)=> {
        this.setState({
            [state]: e.target.value,
        });
        if (state == 'image') {
            this.setState({
                showImage: 'none',
            });
        }
    }
    getRecordData = async (id)=> {
        let request = await fetch('/api/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*' ,
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                id: response.id,
                title: response.title,
                author: response.author,
                image: response.image,
                description: response.description,
                showImage: 'block',
            });
        });
    }
    deleteRecord = ()=>{
        let request = fetch('/api/'+this.state.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*' ,
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                id: 0,
                title: '',
                author: '',
                image: '',
                description: '',
                showImage: 'none',
                showSubmit: 'none',
                showDelete: 'none',
                form_result: response.result,
            });
        });
    }

    formSubmit = async (e)=> {
        e.preventDefault();

        let request = await fetch(e.target.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*' ,
                /* 'Content-Type': 'application/json;charset=utf-8' */
                /* 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', */
                /* 'Content-Type': 'multipart/form-data;', */
            },
            body: new FormData(e.target)
        })
        .then(response => response.json())
        .then(response => {
            if ( response.error === undefined && response.result !== undefined) {
                this.setState({
                    id: response.id,
                    title: response.title,
                    author: response.author,
                    image: response.image,
                    description: response.description,
                    form_result: response.result,
                    showImage: 'block',
                    showSubmit: 'block',
                });
            } else {
                this.setState({
                    'form_result': response.error,
                });
            }
        });
        e.preventDefault();
    }
    render() {
        /* let image_url = ''; */

/*         if(!this.state.image.startsWith('http'))
            image_url = 'storage/'+this.state.image;
        else
            image_url = this.state.image; */

        return (
            <section className="form">
                <button className="button__show-records-list" onClick={()=>{this.props.togglepage('List', 0)}}>Показать список записей</button>
                <h2>{this.state.form_title}</h2>
                <div className="form__result">{this.state.form_result}</div>
                <form action={this.state.form_action} className="form__container" method="POST" onSubmit={this.formSubmit} encType="multipart/form-data">
                    <input type="hidden" value={this.state.method} name="_method"/>
                    <input type="text" name="title" value={this.state.title} placeholder="Наименование" onChange={(e)=>{this.changeValueOfInput(e,'title')}}/>
                    <input type="text" name="author" value={this.state.author} placeholder="Автор"  onChange={(e)=>{this.changeValueOfInput(e,'author')}}/>
                    <textarea name="description" placeholder="Описание" value={this.state.description} onChange={(e)=>{this.changeValueOfInput(e,'description')}}></textarea>
                    <img className="form__image" src={this.state.image} alt = "" style={{display: this.state.showImage}}/>
                    <input type="file" name="image" placeholder="Изображение"  onChange={(e)=>{this.changeValueOfInput(e,'image')}}/>
                    <button type="submit" style={{display: this.state.showSubmit}}>Отправить</button>
                    <button type="button" style={{display: this.state.showDelete}} onClick={this.deleteRecord}>Удалить</button>
                </form>
            </section>
        )
    }
}
