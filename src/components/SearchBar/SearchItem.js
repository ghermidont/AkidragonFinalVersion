//implement redirect to the individual article page
import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {useNavBarContext} from "../../context/NavBarContext";
import {Col, Container, Row} from "react-bootstrap";
//https://www.pluralsight.com/guides/how-to-implement-a-read-more-link-in-react

const Item = (props) => {
    const [readMore,setReadMore] = useState(false);

    const extraContent=
        <div>
            <p className="extra-content">
                {props.content}
            </p>
        </div>

    const linkName = readMore ? 'Read Less << ' : 'Read More >> '

    return (
        <li>
            <Container>
                <Row>
                    <Col>
                        <img src={props.imageURL} alt="article graphics"/>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Row>
                                    <h3>Title: {props.title||"Article title..."}</h3>
                                    <br/>
                                </Row>
                                <Row>
                                    Description: {props.description||"Article description..."}
                                    <br/>
                                </Row>
                                <Row style={{display: 'flex'}}>
                                        <Link onClick={()=>{setReadMore(!readMore)}}>
                                            {linkName}
                                        </Link >
                                    <br/>
                                        {readMore && extraContent}
                                    <br/>
                                    <Link to={`/article/${props.slug}`}>
                                        Full article page>>>
                                    </Link>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
       </li>
    )
}

export default Item

