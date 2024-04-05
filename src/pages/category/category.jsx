import {
  Alert,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../../components/carousel/carousel";
import useWindowOrientation from "use-window-orientation";
import useNotifications from "../../hooks/useNotification";
import { styled } from "@mui/system";
import { useOnlineStatus } from "../../hooks/useNetwork";
import { apiUrl, basePath } from "../../config/api";
import ReactSession from "../../adapters/session/session";

export default function Categories() {
  const navigate = useNavigate();
  const [, notificationsActions] = useNotifications();
  const isOnline = useOnlineStatus();
  const { orientation, portrait, landscape } = useWindowOrientation();
  const [token, setToken] = useState(null);
  const [resources, setResources] = useState([]);
  const object = JSON.parse(window.atob(ReactSession.get("user").split(".")[1]));
  const isAdmin = object.role[0] === 'admin';

  let { id } = useParams();
  const [logPlayer, setLogPlayer] = useState(
    JSON.parse(localStorage.getItem("logPlayer")) || []
  );

  useEffect(() => {
    localStorage.setItem("logPlayer", JSON.stringify(logPlayer));
  }, [logPlayer]);

  useEffect(() => {
    const tokenData = ReactSession.get("user");
    if (tokenData) {
      setToken(tokenData);
      handleRes(tokenData);
    }
  }, []);

  const handleRes = async (token) => {
    try {
      fetch(`${apiUrl}/category/resources`, {
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
            if(isAdmin){
              setResources(json);
            } else {
              const filteredData = json.filter((data) => (data.country === object.country) || (data.country === "ALL"))
              setResources(filteredData)
            }
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

  async function addToLog(newItem) {
    await setLogPlayer([...logPlayer, newItem]);
  }

  function removeLog(id) {
    setLogPlayer(logPlayer.filter((item) => item.id !== id));
  }

  const handlerIframe = async (data) => {
    if (
      (landscape && data.orientation === "horizontal") ||
      (portrait && data.orientation === "vertical")
    ) {
      const alreadyInLog = logPlayer.some((item) => item.id === data.id);
      if (alreadyInLog) {
        let encodedUrl = base64_encode(`${basePath}/resource/${data.resource}`);
        console.log(encodedUrl)
        let orientation = base64_encode(data.orientation);
        navigate(`/app/player/${encodedUrl}`);
      } else {
        if (isOnline) {
          if (!alreadyInLog) {
            await addToLog(data);
          }
          let encodedUrl = base64_encode(
            `${basePath}/resource/${data.resource}`
          );
          let orientation = base64_encode(data.orientation);
          navigate(`/app/player/${encodedUrl}`);
        } else {
          notificationsActions.push({
            options: {
              content: (
                <Alert
                  sx={{ backgroundColor: "#fff" }}
                  variant="outlined"
                  severity="warning"
                >
                  El recurso aun no se ha procesado. Por favor contectate a
                  Internet e intentalo nuevamente
                </Alert>
              ),
            },
          });
        }
      }
    } else {
      notificationsActions.push({
        options: {
          content: (
            <Alert
              sx={{ backgroundColor: "#fff" }}
              variant="outlined"
              severity="warning"
            >
              Para ver el recurso cambia la orientación del dispositivo a modo{" "}
              <strong>{data.orientation}</strong>
            </Alert>
          ),
        },
      });
    }
  };

  const CardContentNoPadding = styled(CardContent)(`
    padding: 10px;
    &:last-child {
      padding-bottom: 10px;
    }
  `);

  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ marginTop: 2 , marginBottom: 2}}>
        <Carousel imgType="subhome" />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ paddingTop: 2 }}
        >
          {resources &&
            resources.map((data) => {
              const isReadyOffline = logPlayer.some(
                (item) => item.id === data.id
              );
              return (
                data.category === id && (
                  <Grid item xs={12} sm={4} md={3}>
                    <Card
                      sx={{ maxWidth: 400 }}
                      onClick={() => handlerIframe(data)}
                    >
                      <CardMedia
                        sx={{ height: 200 }}
                        image={`${basePath}/resource/${data.resource}/portada.jpg`}
                        title="Portada"
                      />
                      <CardContentNoPadding sx={{ textAlign: "center" }}>
                        <Badge
                          color={isReadyOffline ? "success" : "error"}
                          badgeContent=" "
                          variant="dot"
                        >
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="center"
                            sx={{ marginBottom: 0 }}
                          >
                            {data.name}
                          </Typography>
                        </Badge>
                      </CardContentNoPadding>
                    </Card>
                  </Grid>
                )
              );
            })}
        </Grid>
      </Container>
    </Fragment>
  );
}
