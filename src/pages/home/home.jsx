import { Fragment, useEffect, useState } from "react";
import Carousel from "../../components/carousel/carousel";
import { Box, Card, CardMedia, Container, Grid } from "@mui/material";
import CardCategory from "../../components/category/category";
import { useNavigate } from "react-router-dom";
import { apiUrl, basePath } from "../../config/api";
import ReactSession from "../../adapters/session/session";

export default function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState(null)
  const object = ReactSession.get("user") && JSON.parse(window.atob(ReactSession.get("user").split(".")[1]));
  const isAdmin = object && object.role[0] === 'admin';

  useEffect(() => {
    const tokenData = ReactSession.get("user");
    if (tokenData) {
      setToken(tokenData);
      handleCategories(tokenData);
    }
  }, []);
  const handleCategories = async (token) => {
    try {
      fetch(`${apiUrl}/category`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            notificationsActions.push({
              options: {
                content: (
                  <Alert
                    sx={{ backgroundColor: "#fff" }}
                    variant="outlined"
                    severity="error"
                  >
                    {`${response.status} - ${response.statusText}`}
                  </Alert>
                ),
              },
            });
          }
        })
        .then((json) => {
          if (json) {
            setCategories(json);
          }
        })
        .catch((err) => {
          notificationsActions.push({
            options: {
              content: (
                <Alert
                  sx={{ backgroundColor: "#fff" }}
                  variant="outlined"
                  severity="error"
                >
                  {err}
                </Alert>
              ),
            },
          });
        });
    } catch (error) {
      notificationsActions.push({
        options: {
          content: (
            <Alert
              sx={{ backgroundColor: "#fff" }}
              variant="outlined"
              severity="error"
            >
              {error}
            </Alert>
          ),
        },
      });
    }
  };
    const handlerCategory = (id) => {
        navigate('/app/categories/'+id)
    }
  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ marginTop: 2 , marginBottom: 2}}>
        <Carousel imgType="home" />
        <Box component={"div"} sx={{ marginTop: 2 }}>
          <Grid container spacing={3}>
            {
              categories && categories.map((cat) => (
                <Grid item xs={12} sm={6} md={4}>
                <Card onClick={() => handlerCategory(cat.id)}>
                  <div style={{ position: "relative" }}>
                    <CardMedia
                      style={{ height: "250px"}}
                      component="img"
                      image={`${basePath}/media/${cat.banner}`}
                      title="Medicos"
                      alt="Medicos"
                    />
                    <div
                      style={{
                        position: "absolute",
                        color: "white",
                        top: 10,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                    </div>
                  </div>
                </Card>
              </Grid>
              ))
            }
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}
