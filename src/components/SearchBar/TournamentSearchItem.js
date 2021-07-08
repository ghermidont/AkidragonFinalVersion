/* eslint-disable react/prop-types */
import React from "react";
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const TournamentSearchItem = (props) => {
	return (
		<li key={props.id}>
			<Container>
				<Row>
					<Col>
						{/* eslint-disable-next-line react/prop-types */}
						<img src={props.tournamentBanner} alt="Tournament graphics"/>
					</Col>
					<Col>
						<Row>
							<Col>
								<Row>
									{/* eslint-disable-next-line react/prop-types */}
									<h3>Title: {props.tournamentTitle || "Tournament title..."}</h3>
									<br/>
								</Row>
								<Row>
									{/* eslint-disable-next-line react/prop-types */}
									<Link onClick={props.handleClose} to={"/TournamentsPage"}>
                                        &gt;&gt;&gt;Tournament page
									</Link>
								</Row>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
			<br/>
		</li>
	);
};

export default TournamentSearchItem;

