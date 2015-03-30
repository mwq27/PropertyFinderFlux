'use strict';

var React = require('react-native');
var SearchActions = require('./Actions/SearchActions.js');
var PropertyStore = require('./Stores/PropertyStore');
var SearchResults = require('./SearchResults');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
} = React;

var styles = StyleSheet.create({
    description : {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color : '#656565'
    },
    container : {
        padding: 30,
        marginTop: 65,
        alignItems : 'center'
    },

    flowRight : {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    buttonText :{
        fontSize: 18,
        color: '#ffffff',
        alignSelf : 'center'
    },

    button : {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },

    image: {
        width: 217,
        height: 138
    }
});

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this._getIndexState();
    }

    _getIndexState() {
        this.state = {
            searchString: 'london',
            results : PropertyStore.getResults(),
            isLoading: false
        };
        if (PropertyStore.getResults()) {
            this.setState({
                isLoading : false
            });
            this.props.navigator.push({
              title: 'Results',
              component: SearchResults,
              passProps: {listings: PropertyStore.getResults()}
            });
        }
    }

    onSearchTextChanged(event) {
        this.setState({
            searchString: event.nativeEvent.text
        });
    }
    
    componentWillMount() {
        this._getIndexState();
    }

    componentDidMount() {
        PropertyStore.addChangeListener(this._onChange.bind(this));
        
    }

    componentWillUnmount() {
        PropertyStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this._getIndexState();
    }

    _executeQuery(query) {
        this.setState({
            isLoading: true
        });
    }

    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
        SearchActions.runSearch(query);
    }

    render() {
        var spinner = this.state.isLoading ? 
            (<ActivityIndicatorIOS
                hidden='true'
                size='large' />) : (<View/>);

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    {"Search for hours to buy!"}
                </Text>
                <Text style={styles.description}>
                    {"Search by place-name, postcode, or search near your location"}
                </Text>

                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged.bind(this)}
                        placeholder='Search via name or postcode' />
                    <TouchableHighlight style={styles.button}
                        onPress={this.onSearchPressed.bind(this)}
                        underlayColor='#99d9f4' >
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight style={styles.button}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>
                {spinner}
            </View>
        );
    }
}
module.exports = SearchPage;

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;
 
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
 
  return 'http://api.nestoria.co.uk/api?' + querystring;
};