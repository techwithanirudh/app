import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, getChannelMessages } from '../../store/messages';
import Message from './message/message';
import MessageBox from './message-box/message-box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './text-based-channel.scoped.css';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
 
const TextBasedChannel: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const channel = useSelector((s: Store.AppStore) => s.ui.activeChannel)!;  
  const messages = useSelector(getChannelMessages(channel.id));

  useEffect(() => {    
    dispatch(fetchMessages(channel.id));
  }, [messages.length]); // only fetches channel messages when not cached

  const welcome = (
    <div className="m-4 pb-6 border-bottom">
      <span className="rounded-full heading">
        <FontAwesomeIcon
          style={{ color: 'var(--muted)' }}
          icon={faHashtag}
          size="3x" />
      </span>
      <h1 className="text-3xl font-bold my-2">Welcome to #{channel.name}!</h1>
      <p className="lead">This is the start of the #{channel.name} channel.</p>
    </div>
  );
  
  return (
    <div className="text-based-channel flex flex-col flex-grow">
      <div className="messages overflow-auto mb-5 mr-1 mt-1">
        {welcome}
        {messages.map(m => <Message key={m.id} message={m} />)}
      </div>
      <MessageBox />
    </div>
  );
}

export default TextBasedChannel;