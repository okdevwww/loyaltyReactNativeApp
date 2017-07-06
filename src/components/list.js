import React, { Component } from 'react';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import {View} from 'react-native'
import { getData } from '../actions/index.js';
import {connect} from 'react-redux';

class List extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            pageNumber:1,
            pageSize:40,
            startDate:'2017-01-01',
            endDate:'2017-12-01',
        }
    }

    componentWillMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        console.log("dsfsdfsd", nextProps.listData)
    }

    onClick = () =>{
        let data = {pageNumber:this.state.pageNumber, pageSize: this.state.pageSize, startDate:this.state.startDate, endDate:this.state.endDate}
        this.props.getData(data);

    }

    render(){
        console.log(this.props.listData);
        return(
        <Container>
            <Header>
                <Body>
                    <Title>List Container</Title>
                </Body>
            </Header>
            <Button onPress={this.onClick}></Button>
            
        </Container>
        );
    }
}
const mapStateToProps = (state)=>{
    return{
        listData : state.listData
    };
}
const matchDispatchToProps = (dispatch) => {
    return{
        getData:(data)=>{
            dispatch(getData(data))
        }
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(List);