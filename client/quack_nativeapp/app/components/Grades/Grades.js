import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';
import { HeaderContainer, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';


class Grades extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        authToken: '',
        email: '',
        course: '',
        courseID: '',
        quizzes: [],
    }

    componentDidMount() {
        this.setState({course:this.props.navigation.state.params.course});
        this.setState({courseID:this.props.navigation.state.params.id});
        this.props.client.mutate({ mutation: gql`
                mutation userGetQuizzes($courseID: Int!) {
                    userGetQuizzes(courseID: $courseID) {
                        id
                        isOpen
                        date
                    }
                }
            `,
            variables: {
                courseID : parseInt(this.state.courseID),
            }
            }).then( data => {
                quizzes = [];

                if(data.data.userGetQuizzes == null) {
                    courses.push({id : 'No Quizzes', isOpen:false, date:'', key:0})
                }
                else {
                    for(let i = 0; i < data.data.userGetQuizzes.length; i++) {
                        courses.push({id : data.data.userGetQuizzes[i].id, isOpen:data.data.userGetQuizzes[i].isOpen, date:data.data.userGetQuizzes[i].date, key:i})
                    }
                }
                this.setState({quizzes});
            }).catch(function(error) {
                alert(error.message);
            });
    }

    
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name='arrow-back' style={styles.backButton}/>
                        </TouchableOpacity>
                    </Left>
                </Header>

                <View style={styles.header}>
                    <Text style={styles.bigTitle}>
                        {this.state.course}
                    </Text>
                </View>

                <View style={styles.gradesListView}>
                    <ScrollView style={styles.gradesListRow}>
                        {this.state.quizzes.map(({id, isOpen, date}) => {
                            return (
                                <View>
                                    <Grid>
                                        <Col size={65}>
                                            <Text>Quiz {id}</Text>
                                        </Col>
                                        <Col size={35}>
                                            <Text> {date.substring(0,2)} / {date.substring(2,4)} </Text>
                                        </Col>
                                    </Grid>
                                </View>);
                                }
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default withApollo(Grades)