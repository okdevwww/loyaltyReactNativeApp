import React, {Component} from 'react';
import {
    Container,
    Content,
    Text,
    Card,
    Header,
    Body,
    Button,
    Title,
    CardItem,
    Icon
} from 'native-base';
import {View, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Modal} from 'react-native'
import {getData} from '../actions/index.js';
import {connect} from 'react-redux';
import DatePicker from 'react-native-datepicker'

class List extends Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = yyyy + '-' + mm + '-' + dd;
        this.state = {
            pageNumber: 1,
            pageSize: 40,
            startDate: today,
            endDate: today,
            data:[],
            loading:false
        }
    }

    componentWillMount() { this.fetchData()}

    componentWillReceiveProps(nextProps) {
        if(nextProps.listData.status) this.setState({data:nextProps.listData.data, loading:false})
    }

    fetchData = (pageNumber=this.state.pageNumber, pageSize=this.state.pageSize, startDate=this.state.startDate, endDate=this.state.endDate) => {
        this.setState({loading:true});
        let data = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            startDate: startDate,
            endDate: endDate
        }
        this.props.getData(data);

    }

    onPagenation =(index) => {
        let pageNumber =  Number(this.state.pageNumber);
        if(index===0)
            pageNumber = pageNumber>1?pageNumber-1:1
        else
            pageNumber = pageNumber + 1;
        this.setState({pageNumber:pageNumber});
        this.fetchData(pageNumber, this.state.pageSize, this.state.startDate, this.state.endDate);
    }

    onDateChange = (date,index) =>{
        if(index ==0) {
            this.setState({startDate: date}); 
            this.fetchData(this.state.pageNumber, this.state.pageSize, date, this.state.endDate);
        }
        else {
            this.setState({endDate: date}); 
            this.fetchData(this.state.pageNumber, this.state.pageSize, this.state.startDate, date);
        }
        

    }

    render() {
        console.log(this.props.listData);
        return (
            <Container>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.loading}
                    >
                    <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
                         <ActivityIndicator animating={this.state.loading} size={'large'} />
                    </View>

                 </Modal>
                
                <Header>
                    <Body>
                        <Title>App for testing API connection</Title>
                    </Body>
                </Header>
                <View style={{flexDirection:'row', width:'100%', justifyContent:'center', alignItems:'center', padding:10}}>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <DatePicker
                        style={{width: 80}}
                        date={this.state.startDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: -35,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: -35
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.onDateChange(date,0)}}
                    />
                    </View>
                    <Text>~</Text>
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                    <DatePicker
                        style={{width: 80}}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            right: -35,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: -35
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.onDateChange(date,1)}}
                    />
                    </View>
                </View>
                <Card>
                    <ScrollView style={{padding:10}}>
                        {
                            this.state.data.map((item, index) => {
                                return <Text key={index}> {item.Title}</Text>
                            })
                        }
                    </ScrollView>
                </Card>
                <View style={{flexDirection:'row', padding:10, justifyContent:'space-around', alignItems:'center'}}>
                    <TouchableOpacity onPress={(e)=>this.onPagenation(0)}>
                        <Icon name="arrow-back"/>
                    </TouchableOpacity>
                    <TextInput
                        style={{height: 30, width:70, borderColor: 'gray', borderWidth: 1, textAlign:'center'}}
                        onChangeText={(text) => this.setState({pageNumber:Number(text)})}
                        onBlur={(e)=>this.fetchData()}
                        value={this.state.pageNumber.toString()}
                    />
                    <TouchableOpacity onPress={(e)=>this.onPagenation(1)}>
                        <Icon name="arrow-forward"/>
                    </TouchableOpacity>
                    
                </View>
            </Container>
        );
    }
}

const styles={
    container:{

    }
}
const mapStateToProps = (state) => {
    return {listData: state.listData};
}
const matchDispatchToProps = (dispatch) => {
    return {
        getData: (data) => {
            dispatch(getData(data))
        }
    }
}
export default connect(mapStateToProps, matchDispatchToProps)(List);