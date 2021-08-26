import React from 'react';
import { Col } from 'antd';  // AntDesign에서 import

function GridCards(props) {
    if (props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}> {/* antd에서 전체 col은 24 값을 가짐 */}
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </Col>
        );
    } else {
        return (
            <Col lg={6} md={8} xs={24}> {/* antd에서 전체 col은 24 값을 가짐 */}
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName} />
                </div>
            </Col>
        );
    }
    
}

export default GridCards;