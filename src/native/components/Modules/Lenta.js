import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import XMLParser from 'react-xml-parser';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { DateTime } from 'luxon';

const lentsUrl = [
  {
    "title":"Наука",
    "url":"https://lenta.ru/rss/news/science/science/"
  },
  {
    "title":"Космос",
    "url":"https://lenta.ru/rss/news/science/cosmos/"
  },
  {
    "title":"Все Новости",
    "url":"https://lenta.ru/rss"
  },
];

class Lenta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watched: {},
      newsList: [],
      updateTime: null,
      news: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { newsList, news, watched } = this.state;
    if (prevState.newsList.length !== newsList.length) {
      this.getNews();
    }

    if (Object.keys(watched).length > 1 && Object.keys(watched).length === newsList.length) {
      this.setState({ watched: {} });
    }

    if (news && prevState.news != news) {
      watched[news.guid] = true;
      this.setState({ watched });
    }
  }

  componentDidMount() {
    this.getNewsList();
    setInterval(this.getNews, 120000);
  }

  getNewsList = () => {
    const { watched } = this.state;

    const parser = new XMLParser();
    const now = DateTime.local();

    lentsUrl.forEach(({title, url}) => {
      fetch(url)
        .then(response => response.text())
        .then((response) => {
          const xml = parser.parseFromString(response);
          const items = xml.getElementsByTagName('item');

          const newsList = items.map((item) => {
            const guid = item.getElementsByTagName('guid') || '';
            const title = item.getElementsByTagName('title') || '';
            const link = item.getElementsByTagName('link') || '';
            const description = item.getElementsByTagName('description') || '';
            const pubDate = item.getElementsByTagName('pubDate') || '';
            const enclosure = item.getElementsByTagName('enclosure') || '';
            const category = item.getElementsByTagName('category') || '';

            if (!!pubDate && pubDate.length && pubDate[0].value) {
              const dateTimeNews = DateTime.fromRFC2822(pubDate[0].value);
              const diffNow = dateTimeNews.diffNow(['days', 'hours']).toObject();

              if (!!Math.abs(diffNow.days)) {
                return false;
              }
              if (Math.abs(diffNow.hours) > 23) {
                return false;
              }
            }

            console.log('title', title);

            return {
              guid: !!guid && !!guid.length ? guid[0].value : '',
              title: !!title && title.length ? title[0].value : '',
              link: !!link && link.length ? link[0].value : '',
              description: !!description && description.length ? description[0].value : '',
              pubDate: !!pubDate && pubDate.length ? pubDate[0].value : '',
              enclosure: !!enclosure && enclosure.length ? enclosure[0].value : '',
              category: !!category && category.length ? category[0].value : '',
            };
          })
          .filter(Boolean);

          this.setState({newsList});
        });
    });

    this.setState({watched: {}});
  }

  getNextNews = () => {
    const { newsList, news } = this.state;
    const now = DateTime.local();

    const newsIndex = newsList.indexOf(news);
    let nNews;

    if (newsIndex == newsList.length-1) {
      nNews = newsList[0]
    } else {
      nNews = newsList[newsIndex+1]
    };

    this.setState({
      news: nNews,
      updateTime: now,
    });
  }

  getPreviousNews = () => {
    const { newsList, news } = this.state;
    const now = DateTime.local();
    const newsIndex = newsList.indexOf(news);
    let nNews;

    if (newsIndex == -1) {
      nNews = newsList[newsList.length-1]
    } else {
      nNews = newsList[newsIndex-1]
    };

    this.setState({
      news: nNews,
      updateTime: now,
    });
  }

  getNews = (forced = false) => {
    const { newsList, watched, updateTime } = this.state;
    const now = DateTime.local();

    if (!!updateTime && !forced) {
      const diffNow = updateTime.diffNow().toObject();
      if (Math.abs(diffNow.milliseconds) < 120000) {
        return;
      }
    }

    let actialNews;

    newsList.forEach((n) => {
      if (!actialNews && !watched[n.guid]) {
        actialNews = n;
      }
    });

    this.setState({
      news: actialNews,
      updateTime: now,
    });
  }

  getNewsForced = () => this.getNews(true)

  render() {
    const { newsList, news } = this.state;

    if (!news) {
      return (
        <Container>
          <View style={styles.base}>
            <TouchableOpacity
              onPress={this.getNewsList}
            >
              <Text style={styles.themeAndTime}>
                Нет новых новостей (нажмите для загрузки новостей)
              </Text>
            </TouchableOpacity>
          </View>
        </Container>
      );
    }

    const {
      guid,
      title,
      link,
      description,
      pubDate,
      enclosure,
      category,
    } = news;

    const dateTimeNews = DateTime.fromRFC2822(pubDate);
    const diffNow = dateTimeNews.diffNow(['hours', 'minute']).toObject();

    let diffString = '';
    if (!!Math.abs(diffNow.hours)) {
      if (Math.abs(diffNow.hours) > 1) {
        diffString += `час, `;
      } else {
        diffString += `${Math.abs(diffNow.hours)} часа, `;
      }
    }

    if (!!Math.abs(diffNow.minutes)) {
      if (Math.abs(diffNow.minutes) > 10) {
        diffString += `${Math.ceil(Math.abs(diffNow.minutes))} минут, `;
      }
    }

    return (
      <GestureRecognizer
        onSwipeLeft={this.getPreviousNews}
        onSwipeRight={this.getNextNews}
      >
        <View style={styles.base}>
          <TouchableOpacity
            onPress={this.getNewsForced}
          >
            <Text style={styles.themeAndTime}>
              {category}, {diffString} назад:
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.summary}>
            {description}
          </Text>
        </View>
      </GestureRecognizer>
    );
  }
};

export {
  Lenta
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  themeAndTime: {
    fontFamily: "OpenSans_light",
    color: '#666',
    fontWeight: "100",
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
  title: {
    fontFamily: "Roboto_condensed_light",
    color: '#fff',
    fontWeight: "200",
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },
  summary: {
    fontFamily: "OpenSans_light",
    color: '#aaa',
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
});
