import React, { useState, useContext } from "react";
import "../../Layout/style.css";
import FileBase64 from "react-file-base64";
import fetchDogBreeds, { fetchCatsBreeds } from "./Breeds";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FloatingLabel,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Container,
} from "react-bootstrap";
import api from "../../utils/API";
import { UserContext } from "../../Context/AuthContext";

export default function EditPetsModal({
  openEditModalHandler,
  isEditFormOpen,
  getAllPetsFromDB,
  pet,
  id,
}) {
  const { user } = useContext(UserContext);

  const [type, setAnimalType] = useState(pet.type);
  const [name, setAnimalName] = useState(pet.name);
  const [picture, setPicture] = useState(pet.picture);
  const [adoptionStatus, setAdoptionStatus] = useState(pet.adoptionStatus);
  const [height, setHeight] = useState(pet.height);
  const [weight, setWeight] = useState(pet.weight);
  const [color, setColor] = useState(pet.color);
  const [bio, setBio] = useState(pet.bio);
  const [hypoallergenic, setHypoallergenic] = useState(pet.hypoallergenic);
  const [dietery, setDietaryRest] = useState(pet.dietery);
  const [breed, setBreed] = useState(pet.breed);
  const [breedsList, setBreedsList] = useState([]);

  const toggleBreeds = async (type) => {
    const select = document.querySelector(".breeds");
    function removeAllChildNodes(parent) {
      if (parent == null) {
        return;
      } else {
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
      }
    }

    if (type === "Dog") {
      removeAllChildNodes(select);
      setBreedsList(await fetchDogBreeds());
    } else if (type === "Cat") {
      removeAllChildNodes(select);
      setBreedsList(await fetchCatsBreeds());
    } else if (type === "Select") {
      removeAllChildNodes(select);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const editedPet = {
      id: id,
      type: type,
      name: name,
      adoptionStatus: adoptionStatus,
      picture: picture,
      height: height,
      weight: weight,
      color: color,
      bio: bio,
      hypoallergenic: hypoallergenic,
      dietery: dietery,
      breed: breed,
    };
    await api.editPet(editedPet, user);
    await getAllPetsFromDB();
    openEditModalHandler();
  };

  return (
    <Modal
      className="p-5"
      dialogClassName="edit-pet-modal"
      show={isEditFormOpen}
      onHide={openEditModalHandler}
    >
      <Container className="d-flex flex-col text-center  justify-content-center">
        <Row
          className=" text-center justify-content-center d-flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Modal.Title className="p-0 m-0">Edit Pet</Modal.Title>
          <Modal.Body>
            <Row className="">
              <Col className="me-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Animal Type"
                  className="my-2"
                >
                  <Form.Select
                    onChange={(e) => {
                      setAnimalType(e.target.value);
                      toggleBreeds(e.target.value);
                    }}
                    name="type"
                    className=""
                    placeholder="Animal Type"
                    aria-label="Animal Type"
                    type="text"
                    value={type}
                  >
                    <option>Select</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  className="mb-2"
                  controlId="floatinganimalname"
                  label="Animal Name"
                >
                  <Form.Control
                    onChange={(e) => setAnimalName(e.target.value)}
                    name="animalName"
                    placeholder="Animal Name"
                    type="name"
                    value={name}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingStatus"
                  label="Adoption Status"
                  className="mb-2"
                >
                  <Form.Select
                    onChange={(e) => setAdoptionStatus(e.target.value)}
                    name="adoptionStatus"
                    placeholder="Adoption Status"
                    aria-label="Adoption Status"
                    type="text"
                    value={adoptionStatus}
                  >
                    <option></option>
                    <option value="Available">Available</option>
                    <option value="Fostered">Fostered</option>
                    <option value="Adopted">Adopted</option>
                  </Form.Select>
                </FloatingLabel>
                <div className="d-flex flex-row">
                  <FloatingLabel
                    className="mb-2 w-50 me-2"
                    controlId="floatingHeight"
                    label="Height"
                  >
                    <Form.Control
                      placeholder="Height"
                      onChange={(e) => setHeight(e.target.value)}
                      name="height"
                      type="number"
                      value={height}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    className="mb-2 w-50 ms-2"
                    controlId="floatingWeight"
                    label="Weight"
                  >
                    <Form.Control
                      placeholder="Weight"
                      onChange={(e) => setWeight(e.target.value)}
                      name="weight"
                      type="number"
                      value={weight}
                    />
                  </FloatingLabel>
                </div>
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setPicture({ picture: base64 })}
                />
              </Col>
              <Col className="justify-content-between">
                <FloatingLabel
                  className="my-2"
                  controlId="floatingBreed"
                  label="Breeds"
                >
                  <Form.Select
                    onChange={(e) => {
                      setBreed(e.target.value);
                      setBreedsList(e.target.value);
                    }}
                    name="Breeds"
                    id="breeds"
                    className="breeds"
                    placeholder="Breeds"
                    type="text"
                    value={breed}
                  ></Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingColor"
                  label="Color"
                  className="my-2"
                >
                  <Form.Select
                    onChange={(e) => setColor(e.target.value)}
                    name="type"
                    placeholder="Color"
                    aria-label="Color"
                    type="select"
                    value={color}
                  >
                    <option value="Beige">Beige</option>
                    <option value="bicolor">Bicolor</option>
                    <option value="Black">Black</option>
                    <option value="Blue">Blue</option>
                    <option value="Brindle">Brindle</option>
                    <option value="Brown">Brown</option>
                    <option value="Cream">Cream</option>
                    <option value="Gold">Gold</option>
                    <option value="Grey">Grey</option>
                    <option value="Harlequin">Harlequin</option>
                    <option value="Merle">Merle</option>
                    <option value="Red">Red</option>
                    <option value="Saddle">Saddle</option>
                    <option value="Spotted">Spotted</option>
                    <option value="Tricolor">Tricolor</option>
                    <option value="Tuxedo">Tuxedo</option>
                    <option value="White">White</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingHypo"
                  label="Hypoallergenic"
                  className="my-2"
                >
                  <Form.Select
                    onChange={(e) => setHypoallergenic(e.target.value)}
                    name="type"
                    placeholder="Hypoallergenic"
                    aria-label="Hypoallergenic"
                    type="select"
                    value={hypoallergenic}
                  >
                    {" "}
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel
                  className="mb-2 pb-1"
                  controlId="floatinganimaldiet"
                  label="Dietary Restrictions"
                >
                  <Form.Control
                    onChange={(e) => setDietaryRest(e.target.value)}
                    name="dietaryRest"
                    className="dietaryRest"
                    placeholder="Dietary Restrictions"
                    type="text"
                    value={dietery}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  className="mx-3 py-2"
                  controlId="floatingBio"
                  label="Update Bio"
                >
                  <Form.Control
                    as="textarea"
                    style={{ height: "350px" }}
                    rows={3}
                    placeholder="Update Bio"
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    type="text"
                    value={bio}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
        </Row>
      </Container>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={async (e) => {
            await onSubmit(e);
          }}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
