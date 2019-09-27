import React from 'react';
import * as rssParser from 'react-native-rss-parser';
import Carousel from 'nuka-carousel';
import { DateTime } from 'luxon';
import { origin } from '../../../config/url';

const lentsUrl = [
  {
    title: 'Наука',
    url: 'http://lenta.ru/rss/news/science/science/',
  },
  {
    title: 'Космос',
    url: 'http://lenta.ru/rss/news/science/cosmos/',
  },
  {
    title: 'Все Новости',
    url: 'http://lenta.ru/rss',
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

    if (news && prevState.news !== news) {
      watched[news.guid] = true;
      this.setState({ watched });
    }
  }

  getNewsList = () => {
    lentsUrl.forEach(({ url }) => {
      const body = { url };
      fetch(`${origin}/lenta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      })
        .then(response => response.text())
        .then(responseData => rssParser.parse(responseData))
        .then((rss) => {
          const newsList = rss.items.map((item) => {
            if (item.published) {
              const dateTimeNews = DateTime.fromRFC2822(item.published);
              const diffNow = dateTimeNews.diffNow(['days', 'hours']).toObject();

              if (Math.abs(diffNow.days)) {
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
          this.setState({ newsList });
        });
    });

    this.setState({ watched: {} });
  }

  getNextNews = () => {
    const { newsList, news } = this.state;
    const now = DateTime.local();

    const newsIndex = newsList.indexOf(news);
    let nNews;

    if (newsIndex === newsList.length - 1) {
      nNews = newsList[0];
    } else {
      nNews = newsList[newsIndex + 1];
    }

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

    if (newsIndex === -1) {
      nNews = newsList[newsList.length - 1];
    } else {
      nNews = newsList[newsIndex - 1];
    }

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

    if (this._carousel && this._carousel.snapToNext) {
      this._carousel.snapToNext(index);
    }

    this.setState({
      news: actialNews,
      updateTime: now,
    });
  }

  getNewsForced = () => this.getNews(true)

  renderItem = (item, index) => {
    const {
      title,
      description,
      pubDate,
      category,
    } = item;

    const dateTimeNews = DateTime.fromRFC2822(pubDate);
    const diffNow = dateTimeNews.diffNow(['hours', 'minute']).toObject();

    let diffString = '';
    if (Math.abs(diffNow.hours)) {
      if (Math.abs(diffNow.hours) > 1) {
        diffString += 'час ';
      } else {
        diffString += `${Math.abs(diffNow.hours)} часа, `;
      }
    }

    if (Math.abs(diffNow.minutes)) {
      if (Math.abs(diffNow.minutes) > 10) {
        diffString += `${Math.ceil(Math.abs(diffNow.minutes))} минут, `;
      }
    }

    return (
      <div
        key={index}
        style={{ ...styles.base }}
      >
        <div onClick={this.getNewsForced}>
          <span style={{ ...styles.themeAndTime }}>
            {category}, {diffString} назад:
          </span>
        </div>
        <span style={{ ...styles.title }}>
          {title}
        </span>
        <span style={{ ...styles.summary }}>
          {description}
        </span>
      </div>
    );
  }

  render() {
    const { newsList, news } = this.state;

    if (!news) {
      return (
        <div>
          <div style={{ ...styles.base }}>
            <div onClick={this.getNewsList}>
              <span style={{ ...styles.themeAndTime }}>
                Нет новых новостей (нажмите для загрузки новостей)
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ ...styles.base }}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          sliderWidth="100%"
          itemWidth="100%"
          activeSlideOffset={80}
          withoutControls
          loop
        >
          {newsList.map(this.renderItem)}
        </Carousel>
      </div>
    );
  }
}

export {
  Lenta as default,
  Lenta,
};

const styles = {
  base: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    maxWidth: '100vw',
  },
  themeAndTime: {
    fontFamily: 'OpenSans_light',
    color: '#666',
    fontWeight: '100',
    fontSize: '20px',
    lineHeight: '25px',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Roboto_condensed_light',
    color: '#fff',
    fontWeight: '200',
    fontSize: '30px',
    lineHeight: '35px',
    display: 'block',
    textAlign: 'center',
  },
  summary: {
    fontFamily: 'OpenSans_light',
    color: '#aaa',
    fontWeight: '300',
    fontSize: '20px',
    lineHeight: '25px',
    textAlign: 'center',
  },
};
