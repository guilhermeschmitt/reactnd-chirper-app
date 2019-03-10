import React from 'react';
import { connect } from 'react-redux';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index';
import { Link, withRouter } from 'react-router-dom';
import { formatTweet, formatDate } from '../utils/helpers';
import { handleToggleTweet } from '../actions/tweets';

class Tweet extends React.Component {

  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  }

  handleLike = e => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser,
    }))
  }

  render() {
    const { tweet } = this.props;

    if (!tweet)
      return <p>Este tweet não existe.</p>

    const { name, avatar, timestamp, text, hasLiked, likes, id, replies, parent } = tweet;

    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>

            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className='replying-to'
                onClick={e => this.toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked
                ? <TiHeartFullOutline className='tweet-icon' color='#e0245e' />
                : <TiHeartOutline className='tweet-icon' />
              }
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

//O segundo argumento da função são as props que recebemos via componente
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authedUser,
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
  }
}

export default withRouter(connect(mapStateToProps)(Tweet));