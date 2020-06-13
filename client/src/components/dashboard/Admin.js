import React, { Component } from "react";

import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Button,
} from "reactstrap";

class Admin extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4">Admin Dashboard</h1>
        <CardGroup className="ml-3 mb-5">
          <Card className="mr-5">
            <CardImg
              top
              width="100%"
              src={require("./assets/users.png")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText></CardText>

              <a
                className="text-white p-2"
                href="http://localhost:5000/admin/resources/users"
                target="_blank"
              >
                <Button>Manage User</Button>
              </a>
            </CardBody>
          </Card>
          <Card className="mr-5">
            <CardImg
              top
              width="100%"
              src={require("./assets/profile.png")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText></CardText>
              <a
                className="text-white p-2"
                href="http://localhost:5000/admin/resources/profile"
                target="_blank"
              >
                <Button>Manage Profile</Button>
              </a>
            </CardBody>
          </Card>
          <Card className="mr-5">
            <CardImg
              top
              width="100%"
              src={require("./assets/event.png")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText></CardText>
              <a
                className="text-white p-2"
                href="http://localhost:5000/admin/resources/ann"
                target="_blank"
              >
                <Button>Manage Announcement</Button>
              </a>
            </CardBody>
          </Card>
        </CardGroup>
        <CardGroup>
          <Card className="mr-5">
            <CardImg
              top
              width="100%"
              src={require("./assets/post.png")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText></CardText>
              <a
                className="text-white p-2"
                href="http://localhost:5000/admin/resources/post"
                target="_blank"
              >
                <Button>Manage Post</Button>
              </a>
            </CardBody>
          </Card>
          <Card className="mr-5">
            <CardImg
              top
              width="100%"
              src={require("./assets/forum.png")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText></CardText>
              <a
                className="text-white p-2"
                href="http://localhost:5000/admin/resources/forum"
                target="_blank"
              >
                <Button>Manage Forum</Button>
              </a>
            </CardBody>
          </Card>
          <Card className="mr-5">
            <CardImg
              top
              width="100%"
              src={require("./assets/qanda.png")}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle></CardSubtitle>
              <CardText></CardText>
              <a
                className="text-white p-2"
                href="http://localhost:5000/admin/resources/qanda"
                target="_blank"
              >
                <Button>Manage Q&A</Button>
              </a>
            </CardBody>
          </Card>
        </CardGroup>
      </div>
    );
  }
}

export default Admin;
