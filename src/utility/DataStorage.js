import React from 'react';
import * as firebase from 'firebase';

const TABLE = "HTML";

export default class DataStorage {
    static username = '';
    static theme = '';
    static code = '-';
    static outputMsg = [];
    static lesson = -1;
    static openLesson = 0;
    static goal = '';
    static streak = 0;
    static lastDate = '';
    static firstLesson = 0;
    static opened = false;
    static language = 'html';
    static projectNum = 1;

    static shownGoodJob = false;

    static _setupUser(theme, goal) {
        let userId = firebase.auth().currentUser.uid;

        // Set theme
        firebase.database().ref('themes/' + userId + '/' + DataStorage.language).set({
            html: theme
        });

        // Set goal
        firebase.database().ref('goals/' + userId).set({
            goal: goal
        });

        // Set code
        firebase.database().ref('code/' + userId + '/' + DataStorage.language + '/project' + DataStorage.projectNum).set({
            code: ""
        });

        // Set lessons
        firebase.database().ref('lessons/' + userId + '/' + DataStorage.language).set({
            lesson: 0
        });

        // Set streak
        let today = new Date();
        let strToday = today.getUTCFullYear() + '/' + (today.getUTCMonth() + 1) + '/' + today.getUTCDate();

        firebase.database().ref('streaks/' + userId).set({
            streak: 1,
            lastDate: strToday
        })
    }

    static _editLesson(lesson) {
        let userId = firebase.auth().currentUser.uid;
        console.log('Edit lesson');

        firebase.database().ref('lessons/' + userId + '/html').update({
            lesson: lesson
        });
    }

    static _editCode(code) {
        let userId = firebase.auth().currentUser.uid;

        if (DataStorage.language === 'html') {
            firebase.database().ref('code/' + userId + '/html/project' + DataStorage.projectNum).update({
                code: code
            });
        }
    }

    static _editStreak(count) {
        let userId = firebase.auth().currentUser.uid;
        let today = new Date();
        let strToday = today.getUTCFullYear() + '/' + (today.getUTCMonth() + 1) + '/' + today.getUTCDate();

        DataStorage.streak = count;
        DataStorage.lastDate = strToday;

        firebase.database().ref('streaks/' + userId).update({
            streak: count,
            lastDate: strToday
        })
    }
}
