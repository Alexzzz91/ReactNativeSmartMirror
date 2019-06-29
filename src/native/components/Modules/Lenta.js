import React from 'react';
import {
  Container, Content, Text, H1, H2, H3,
} from 'native-base';
import { View, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Carousel from 'react-native-snap-carousel';
import { DateTime } from 'luxon';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideWidth = wp(90);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

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
      activeSlide: 0,
      updateTime: null,
      news: undefined,
    };
  }

  componentDidMount() {
    this.getNewsList();
    setInterval(this.getNews, 60000);
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

  getNewsList = () => {
    const { watched } = this.state;
    const now = DateTime.local();

    lentsUrl.forEach(({title, url}) => {
      fetch(url)
        .then((response) => response.text())
        .then((responseData) => rssParser.parse(responseData))
        .then((rss) => {
          const newsList = rss.items.map((item) => {

            if (!!item.published) {
              const dateTimeNews = DateTime.fromRFC2822(item.published);
              const diffNow = dateTimeNews.diffNow(['days', 'hours']).toObject();

              if (!!Math.abs(diffNow.days)) {
                return false;
              }
              if (Math.abs(diffNow.hours) > 23) {
                return false;
              }
            }

            return {
              guid: !!item.id && item.id,
              title: !!item.title && item.title,
              link: !!item.link && item.link.length ? item.link[0].url : '',
              description: item.description && item.description,
              pubDate: !!item.published && item.published,
              enclosure: !!item.enclosures && item.enclosures.length ? item.enclosures[0].url : '',
              category: !!item.categories && item.categories.length ? item.categories[0].name : '',
            };
          }).filter(Boolean);
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
    let index;

    newsList.forEach((n, i) => {
      if (!actialNews && !watched[n.guid]) {
        actialNews = n;
        index = i;
      }
    });

    if (this._carousel) {
      this._carousel.snapToNext(index);
    }

    this.setState({
      news: actialNews,
      updateTime: now,
    });
  }

  getNewsForced = () => this.getNews(true)

  renderItem ({item, index}) {
    const { guid, title, link, description, pubDate, enclosure, category } = item;

    const dateTimeNews = DateTime.fromRFC2822(pubDate);
    const diffNow = dateTimeNews.diffNow(['hours', 'minute']).toObject();

    let diffString = '';
    if (!!Math.abs(diffNow.hours)) {
      if (Math.abs(diffNow.hours) > 1) {
        diffString += `час `;
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
    );
  }

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

    return (
      <View>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={newsList}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          activeSlideOffset={80}
          loop={true}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
        />
      </View>
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
