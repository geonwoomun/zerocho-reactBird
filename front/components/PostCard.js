import React, { useState, useCallback, useEffect } from "react";
import { Button, Avatar, Card, Icon, Input, Form, List, Comment } from "antd";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST } from "../reducers/post";
import Link from "next/link";

const PostCard = ({ post }) => {
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { me } = useSelector(state => state.user);
  const { isAddingComment, commentAdded } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpend(prev => !prev);
    if(!commentFormOpend) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data : post.id,
      })
    }
  }, []);

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();
    if (!me) {
      return alert('로그인이 필요합니다.');
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data : {
        postId : post.id,
        content : commentText,
      }
    })
    setCommentText('');
  }, [me && me.id, commentText]);

  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);
  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value)
  }, []);

  return (
    <div>
      <Card
        key={post.id}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta // 서버 주소라서 새로고침하게된다. 밑에처럼 프론트에서 처리할 수 있게 바꿔줘야함.
          avatar={<Link href={{pathname: '/user', query : {id: post.User.id}}} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
          title={post.User.nickname}
          description={<div>{post.content.split(/(#[^\s]+)/g).map((v) => {
            if (v.match(/#[^\s]+/)) {
              return (
                <Link href={{pathname: '/hashtag', query : {tag : v.slice(1)}}} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
              )
            }
            return v;
          })}</div>} // a tag x -> Link 태크로 바꿔주기. next에서는 a tag 쓰지말고 link로 해야 spa가 유지된다.
        />
      </Card>
        {commentFormOpend && (
          <>
            <Form onSubmit={onSubmitComment}>
              <Form.Item>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
              </Form.Item>
              <Button type="primary" htmlType ="submit" loading={isAddingComment}>삐약</Button>
            </Form>
            <List
            header={`${post.Comments ? post.Comments.length : 0 } 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment 
                author ={item.User.nickname}
                avatar={<Link href={{pathname : '/user', query : {id: item.User.id}}} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                content ={item.content}
               />
              </li>
            )}></List>
          </>
        )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id : PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
};
export default PostCard;
