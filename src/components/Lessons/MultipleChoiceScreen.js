import React, { Component } from 'react';
import { View, Image, Animated, Dimensions, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';
import MultipleChoiceContainer from "./Quizzes/MultipleChoiceContainer";
import DataStorage from '../../utility/DataStorage';
import MatchingContainer from "./Quizzes/MatchingContainer";
import { STATUSBAR_HEIGHT } from '../../styles/Constants';
import DragDropContainer from "./Quizzes/DragDropContainer";

let ProgressBar = (props) => (
    <View style={{ position: 'absolute', top: STATUSBAR_HEIGHT + scale(10), left: scale(15), right: scale(15) }}>
        <Image source={require('../../res/images/progress_bar.png')}
               resizeMode='contain'
                        style={{ flex: 1,
                                 width: Dimensions.get('window').width - scale(30),
                                 height: (Dimensions.get('window').width - scale(30)) / 29 }}/>
        <Animated.View style={{ position: 'absolute', top: 0, left: props.left,
                                width: (Dimensions.get('window').width) / 3 * 2,
                                height: (Dimensions.get('window').width - scale(30)) / 29,
                                backgroundColor: '#F0F0F0' }}/>
    </View>
);

export default class MultipleChoiceScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();

        this.state = {
            qNum: 0,
            correct: -1,
            incorrect: -1
        };

        this.submit = this._submit.bind(this);
        this.next = this._next.bind(this);

        this.progressLeft = new Animated.Value((Dimensions.get('window').width - scale(30)) / 3);
        this.left = [new Animated.Value(0),
                     new Animated.Value(Dimensions.get('window').width),
                     new Animated.Value(Dimensions.get('window').width * 2)];

        this.questions = [
            // Problem2 questions
            [
                a = {
                    type: 'mc',
                    q: 'What does the doctype declaration do?',
                    a: 'Makes your website for you',
                    b: 'Tells the browser which version of HTML you\'re using',
                    c: 'Creates the title of your webpage seen on the tab at the top',
                    ans: 1
                },
                b = {
                    type: 'mc',
                    q: 'What does the doctype declaration look like?',
                    a: '</doctype html>',
                    b: 'HTML document',
                    c: '<!doctype html>',
                    ans: 2
                },
                c = {
                    type: 'mc',
                    q: 'Which line should the doctype declaration go on?',
                    a: 'The first',
                    b: "Anywhere, it doesn't matter",
                    c: 'The last',
                    ans: 0
                }
            ],

            // Problem3 questions
            [
                a = {
                    type: 'mc',
                    q: 'Which of these is a tag?',
                    a: 'This is a tag',
                    b: '<This is a tag>',
                    c: '<p>This is a tag</p>',
                    ans: 2
                },
                b = {
                    type: 'mc',
                    q: 'Every opening tag has a...',
                    a: '/',
                    b: 'closing tag',
                    c: 'doctype declaration',
                    ans: 1
                },
                c = {
                    type: 'matching',
                    options: [{a: '<p>', b: 'Paragraph'}, {a: '<!doctype html>', b: 'Start an html file'},
                        {a: '<b>', b: 'Bold'}, {a: '</>', b: 'Closing tag'}]
                }
            ],

            // Problem4 questions
            [
                a = {
                    type: 'mc',
                    q: 'What goes between <html> and </html>?',
                    a: '<!doctype html>',
                    b: 'Nothing. All the code goes after those tags.',
                    c: 'Everything',
                    ans: 2
                },
                b = {
                    type: 'mc',
                    q: 'Which of these are in the correct order?',
                    a: '~<html>\n</html>\n<!doctype html>',
                    b: '~<!doctype html>\n<html>\n</html>',
                    c: '~</html>\n<!doctype html>\n<html>',
                    ans: 1
                },
                c = {
                    type: 'mc',
                    q: 'Which of these is the closing tag?',
                    a: '<!doctype html>',
                    b: '<html>',
                    c: '</html>',
                    ans: 2
                }
            ],

            // Problem5 questions
            [
                a = {
                    type: 'mc',
                    q: 'What is metadata?',
                    a: 'All the visual elements that the user sees',
                    b: 'Nobody knows...',
                    c: 'Background information, including what\'s used by search engines',
                    ans: 2
                },
                b = {
                    type: 'mc',
                    q: 'Which goes first?',
                    a: '<body>',
                    b: '<head>',
                    c: '</body>',
                    ans: 1
                },
                c = {
                    type: 'mc',
                    q: 'What goes in between <head> and </head>?',
                    a: 'Metadata',
                    b: 'Website content',
                    c: '<!doctype html>',
                    ans: 0
                }
            ],

            // Problem6 questions
            [
                a = {
                    type: 'mc',
                    q: 'Which of these is properly indented?',
                    a: '~<head>\n<title>Title</title>\n</head>',
                    b: '~<head>\n  <title>Title</title>\n</head>',
                    c: '~<!doctype html>\n  <html>\n</html>',
                    ans: 1
                },
                b = {
                    type: 'matching',
                    options: [{a: '<head></head>', b: 'Title + metadata'}, {a: '<p>', b: 'Paragraph'},
                        {a: '<!doctype html>', b: 'Start html document'}, {a: '<html></html>', b: 'Wraps html content'}]
                },
                c = {
                    type: 'mc',
                    q: 'When do you indent',
                    a: 'Never. I like the challenge of reading walls of text',
                    b: 'When adding a tag contained inside another tag',
                    c: 'Every new line',
                    ans: 1
                }
            ],

            // Problem7 questions
            [
                a = {
                    type: 'mc',
                    q: 'Which tags does your title go between?',
                    a: '<head></head>',
                    b: '<body></body>',
                    c: '<p></p>',
                    ans: 0
                },
                b = {
                    type: 'mc',
                    q: 'Where can people see the title?',
                    a: 'Only in the code',
                    b: 'In big text in the center of the page',
                    c: 'On the tab at the top',
                    ans: 2
                },
                c = {
                    type: 'mc',
                    q: 'How many titles should your webpage have?',
                    a: 'One',
                    b: 'Two',
                    c: 'As many as you want',
                    ans: 0
                }
            ],

            // Problem8 questions
            [
                a = {
                    type: 'mc',
                    q: 'What goes in between <body> and </body>?',
                    a: 'Metadata',
                    b: 'All of my content',
                    c: 'Title only',
                    ans: 1
                },
                b = {
                    type: 'mc',
                    q: 'Does <body> go before or after </head>?',
                    a: 'Before',
                    b: 'After',
                    c: 'Neither',
                    ans: 1
                },
                c = {
                    type: 'mc',
                    q: 'Where would a paragraph go?',
                    a: 'Anywhere',
                    b: 'Head',
                    c: 'Body',
                    ans: 2
                }
            ],

            // Problem9 questions
            [
                a = {
                    type: 'mc',
                    q: 'Which of these headings is the biggest?',
                    a: '<h4>Heading</h4>',
                    b: '<h6>HEADING</h6>',
                    c: '<h3>heading</h3>',
                    ans: 2
                },
                b = {
                    type: 'mc',
                    q: 'Where do headings go?',
                    a: 'Head',
                    b: 'Body',
                    c: 'Anywhere',
                    ans: 1
                },
                c = {
                    type: 'matching',
                    options: [{a: '<h1>', b: 'Biggest heading'}, {a: '<h6>', b: 'Smallest heading'},
                                {a: '<body>', b: "webpage's content"}, {a: '<head>', b: 'Title + metadata'}]
                }
            ],

            // Problem10 questions
            [
                a = {
                    type: 'mc',
                    q: 'Which text is bigger?',
                    a: '<h1>',
                    b: '<p>',
                    c: 'They\'re the same',
                    ans: 0
                },
                b = {
                    type: 'mc',
                    q: 'Where do paragraphs go?',
                    a: 'Head',
                    b: 'Body',
                    c: 'Either',
                    ans: 1
                },
                c = {
                    type: 'mc',
                    q: 'What does the h in h2 stand for?',
                    a: 'Head',
                    b: 'Header',
                    c: 'Heading',
                    ans: 2
                }
            ],

            // Problem11 questions
            [
                a = {
                    type: 'mc',
                    q: 'What does a hyperlink do?',
                    a: 'Let users go to a different website by clicking a link',
                    b: 'Always send users to the GoCode website',
                    c: 'Take users to their most recently visited website',
                    ans: 0
                },
                b = {
                    type: 'mc',
                    q: 'Which of these is a proper hyperlink?',
                    a: '~<a>Link</a href="www.google.com">',
                    b: '~<a link="www.google.com">Link</a>',
                    c: '~<a href="www.google.com">Link</a>',
                    ans: 2
                },
                c = {
                    type: 'matching',
                    options: [{a: '<a href=""></a>', b: 'Hyperlink'}, {a: '<p>', b: 'Paragraph'},
                                {a: '<!doctype html>', b: 'Start html document'}, {a: '<head>', b: 'Title + metadata'},
                                {a: '<html></html>', b: 'Wraps html content'}]
                }
            ],

            // Problem12 questions
            [
                a = {
                    type: 'mc',
                    q: 'Which of these is NOT a self-closing tag?',
                    a: '<br>',
                    b: '<img>',
                    c: '<p>',
                    ans: 2
                },
                b = {
                    type: 'mc',
                    q: 'What does a line break do?',
                    a: 'Adds a new line like pressing enter',
                    b: 'Deletes the next line',
                    c: 'Crossed out text',
                    ans: 0
                },
                c = {
                    type: 'mc',
                    q: 'How do you add a line break?',
                    a: '<break>',
                    b: '<br>',
                    c: '<enter>',
                    ans: 1
                }
            ],

            // Problem13 questions
            [
                a = {
                    type: 'mc',
                    q: 'Is img a self-closing tag?',
                    a: 'Yes',
                    b: 'No',
                    c: 'Definitely not',
                    ans: 0
                },
                b = {
                    type: 'mc',
                    q: 'Where do you put a source in an img tag?',
                    a: '~<img src="here">',
                    b: '~<img source="here">',
                    c: '~<img>here</img>',
                    ans: 0
                },
                c = {
                    type: 'mc',
                    q: 'What goes in between <body> and </body>?',
                    a: 'Metadata',
                    b: 'All of my content',
                    c: 'Title only',
                    ans: 1
                }
            ],

            // Problem14 questions
            [
                a = {
                    type: 'mc',
                    q: 'Does an attribute go in the opening or closing tag?',
                    a: 'Opening',
                    b: 'Closing',
                    c: 'Between opning and closing',
                    ans: 0
                },
                b = {
                    type: 'mc',
                    q: 'Which of these is correctly formatted?',
                    a: '~width={150}',
                    b: '~width=150',
                    c: '~width="150"',
                    ans: 2
                },
                c = {
                    type: 'mc',
                    q: 'Which is NOT an attribute?',
                    a: 'doctype',
                    b: 'src',
                    c: 'width',
                    ans: 0
                }
            ]
        ]
    }

    render() {
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#F0F0F0'}}>
                <ProgressBar left={this.progressLeft}/>

                {this._renderFirstQs()}
            </View>
        );
    }

    _renderFirstQs() {
        return this.left.map((left, i) => {
            if (i <= this.state.qNum + 1) {
                if (this.questions[this.props.navigation.state.params.lesson - 2][i].type === 'mc') {
                    return (
                        <MultipleChoiceContainer
                            key={i}
                            question={this._getQuestion(i)}
                            answers={this._getAnswers(i)}
                            correct={this.state.correct}
                            incorrect={this.state.incorrect}
                            submit={this.submit}
                            next={this.next}
                            left={left}
                        />
                    );
                } else if (this.questions[this.props.navigation.state.params.lesson - 2][i].type === 'matching') {
                    return (
                        <MatchingContainer
                            key={i}
                            options={this.questions[this.props.navigation.state.params.lesson - 2][i].options}
                            next={this.next}
                            left={left}
                        />
                    )
                } else if (this.questions[this.props.navigation.state.params.lesson - 2][i].type === 'dd') {
                    return (
                        <DragDropContainer
                            key={i}
                            options={this.questions[this.props.navigation.state.params.lesson - 2][i].options}
                            answer={this.questions[this.props.navigation.state.params.lesson - 2][i].answer}
                            next={this.next}
                            left={left}
                        />
                    )
                }
            }

            return null;
        });
    }

    _getQuestion(i) {
        return this.questions[this.props.navigation.state.params.lesson - 2][i].q;
    }

    _getAnswers(j) {
        let ans = [];

        for (let i = 0; i < 3; i++) {
            let content = 0;
            if (i === 0)
                content = this.questions[this.props.navigation.state.params.lesson - 2][j].a;
            else if (i === 1)
                content = this.questions[this.props.navigation.state.params.lesson - 2][j].b;
            else
                content = this.questions[this.props.navigation.state.params.lesson - 2][j].c;

            ans.push(content);
        }

        return ans;
    }

    _submit(selected) {
        let qNum = this.state.qNum;

        if (this.questions[this.props.navigation.state.params.lesson - 2][qNum].ans === selected) {
            this.setState({ correct: selected, incorrect: -1 });
        } else {
            this.setState({ incorrect: selected });
        }
    }

    _next() {
        const width = Dimensions.get('window').width;
        let vals = [];
        if (this.state.qNum === 0)
            vals = [-width, 0, width];
        else if (this.state.qNum === 1)
            vals = [-width, -width, 0];
        else {
            // Navigate and return
            if (DataStorage.lesson < 8)
                this.props.navigation.navigate('Code');
            else
                this.props.navigation.navigate('Website');

            return;
        }

        let nextProgLeft = Dimensions.get('window').width / 3 + scale(10);

        if (this.state.qNum === 0)
            nextProgLeft = (Dimensions.get('window').width - scale(30)) / 3 * 2;
        else
            nextProgLeft = Dimensions.get('window').width;

        Animated.spring(this.left[0], {
            toValue: vals[0],
            duration: 400,
            bounciness: 6.5
        }).start();
        Animated.spring(this.left[1], {
            toValue: vals[1],
            duration: 400,
            bounciness: 6.5
        }).start();
        Animated.spring(this.left[2], {
            toValue: vals[2],
            duration: 400,
            bounciness: 6.5
        }).start();
        Animated.spring(this.progressLeft, {
            toValue: nextProgLeft,
            duration: 400,
            bounciness: 4
        }).start();

        let temp = this.state.qNum + 1;
        this.setState({
            qNum: temp,
            correct: -1
        });
    }
}