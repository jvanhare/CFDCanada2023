import { createRoot } from "react-dom/client";

import { Heading, Link, ListItem, Text, UnorderedList } from "spectacle";

import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

import Alert from "./components/Alert";
import Centered from "./components/Centered";
import Equation from "./components/Equation";
import Full from "./components/Full";
import Image from "./components/Image";
import InriaDeck from "./components/InriaDeck";
import TwoColumns from "./components/TwoColumns";

import "./index.css";

const Presentation = () => (
  <InriaDeck>
    <Full>
      <Heading color="primary" textAlign="left">
        Context
      </Heading>
      <Text>
        <UnorderedList>
          <ListItem>
            7th AIAA CFD <Alert>Drag</Alert> Prediction Workshop{" "}
            <Link color="lightblue" href="https://aiaa-dpw.larc.nasa.gov">
              [https://aiaa-dpw.larc.nasa.gov]
            </Link>
          </ListItem>
          <UnorderedList>
            <ListItem>
              Predict the effect of shock-induced separation on the variation of
              lift and pitching moment with increasing angle-of-attack at
              transonic conditions
            </ListItem>
            <ListItem>
              <Alert>Critical</Alert> to aircraft safety and government
              certification regulations
            </ListItem>
            <ListItem>
              NASA CRM Wing-Body configuration{" "}
              <Link
                color="lightblue"
                href="https://commonresearchmodel.larc.nasa.gov"
              >
                [https://commonresearchmodel.larc.nasa.gov]
              </Link>
            </ListItem>
            <ListItem>
              Special focus on Case 1a. targetting grid convergence
            </ListItem>
            <ListItem>Flow conditions:</ListItem>
            <UnorderedList>
              <ListItem>
                <Latex>{`$M = 0.85 ~ [-] $`}</Latex>
              </ListItem>
              <ListItem>
                <Latex>{`$ Re = 20 \\cdot 10^6 ~ [-] $`}</Latex>
              </ListItem>
              <ListItem>
                <Latex>{`$ T = -250 ~ [^\\circ{}F] $`}</Latex>
              </ListItem>
              <ListItem>
                <Latex>{`$ C_L = 0.58 ~ [-] $`}</Latex>
              </ListItem>
            </UnorderedList>
          </UnorderedList>
          <ListItem>
            Mesh convergence study achieved thanks to our{" "}
            <Alert>anisotropic unstructured mesh adaptation</Alert> process
          </ListItem>
        </UnorderedList>
      </Text>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Anisotropic unstructured mesh adaptation process
      </Heading>
      <UnorderedList>
        <ListItem>Pure tetrahedra adapted meshes are considered</ListItem>
        <ListItem>
          No <em>ad hoc</em> size prescription in the boundary layer region
        </ListItem>
        <ListItem>
          Using the minimum number of vertices to obtain the best solution
        </ListItem>
        <ListItem>
          Provide verification results: accurate solution with respect to the
          physical model
        </ListItem>
        <ListItem>
          This process is composed of the following Inria software:
        </ListItem>
        <UnorderedList>
          <ListItem>
            <Alert>Wolf</Alert>: the flow solver
          </ListItem>
          <ListItem>
            <Alert>Wlf-Metrix</Alert>: the error estimate
          </ListItem>
          <ListItem>
            <Alert>Feflo.a</Alert>: the metric-based local remesher
          </ListItem>
          <ListItem>
            <Alert>Wlf-Interpol</Alert>: the solution interpolation
          </ListItem>
        </UnorderedList>
      </UnorderedList>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Flow solver
      </Heading>
      <UnorderedList>
        <ListItem>
          Compressible turbulent Navier-Stokes equations
          <Equation>
            <Latex>{`$$ \\dfrac{\\partial W}{\\partial t} + \\nabla \\cdot \\mathcal{F} \\left( W \\right) = \\mathcal{Q} \\left( W \\right) + \\mathcal{S} \\left( W \\right) $$`}</Latex>
          </Equation>
        </ListItem>
        <ListItem>Spalart-Allmaras turbulence model</ListItem>
        <ListItem>Mixed Element Volume method (MEV)</ListItem>
        <UnorderedList>
          <ListItem>
            Convective and source terms by Finite Volume method
          </ListItem>
          <ListItem>Diffusive terms by Finite Element method</ListItem>
        </UnorderedList>
        <ListItem>Vertex-centered using median cells</ListItem>
        <ListItem>Implicit time integration</ListItem>
        <UnorderedList>
          <ListItem>SGS iterative solver</ListItem>
          <ListItem>
            All terms are fully differentiated except for convective terms due
            to memory considerations
          </ListItem>
          <ListItem>Strong implicit solver</ListItem>
        </UnorderedList>
      </UnorderedList>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Adjoint solver
      </Heading>
      <UnorderedList>
        <ListItem>
          Adjoint linear system
          <Equation>
            <Latex>{`$$ \\left( \\dfrac{\\partial R^n}{\\partial W} \\right) ^{\\top} \\delta W^* = \\dfrac{\\partial J}{\\partial W} $$`}</Latex>
          </Equation>
        </ListItem>
        <UnorderedList>
          <ListItem>Same differentiation as the flow solver</ListItem>
          <ListItem>GMRES with SGS preconditionner</ListItem>
          <ListItem>
            Important to converge the linear system at least at{" "}
            <Latex>{`$10^{-12}$`}</Latex>
          </ListItem>
          <ListItem>
            Using extrapolated values for convective terms provides better
            adjoint
          </ListItem>
        </UnorderedList>
      </UnorderedList>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Goal oriented error estimate
      </Heading>
      <UnorderedList>
        <ListItem>
          Generate the optimal mesh to observe a given functional{" "}
          <Equation>
            <Latex>{`$$j\\left( w \\right) = \\left( g, w \\right)$$`}</Latex>
          </Equation>
        </ListItem>
        <ListItem>
          Formal non-linear <em>a priori</em> error analysis:
          <Equation>
            <Latex>{`$$ \\lvert j\\left( w \\right) - j \\left( w_h \\right) \\rvert = \\left( \\left( \\psi - \\psi_h \\right) \\left( w \\right), w^* \\right) $$`}</Latex>
          </Equation>
        </ListItem>
        <ListItem>Application to compressible Euler equations</ListItem>
        <Equation>
          <Latex>{`$$ \\lvert j\\left( W \\right) - j \\left( W_h \\right) \\rvert \\simeq \\lvert \\lvert \\, \\lvert \\nabla W^* \\rvert \\cdot \\lvert \\mathcal{F} \\left( W \\right) - \\Pi_h \\mathcal{F} \\left( W \\right)  \\rvert \\, \\rvert \\rvert _{L^1 \\left( \\Omega_h \\right)}  $$`}</Latex>
        </Equation>
        <ListItem>
          Application to the Navier-Stokes equation using integration by part
          and linearization
        </ListItem>
        <Equation>
          <Latex>{`$$ \\lvert j\\left( W \\right) - j \\left( W_h \\right) \\rvert \\simeq \\int_{\\Omega} \\lvert W^* \\rvert \\lvert \\nabla \\cdot \\left( \\mathcal{F}^E \\left( W \\right) - \\mathcal{F}^E \\left( \\Pi_h W \\right) \\right) - \\nabla \\cdot \\left( \\mathcal{F}^V \\left( W \\right) - \\mathcal{F}^V \\left( \\Pi_h W \\right) \\right) \\rvert  \\, \\mathrm{d} \\Omega$$`}</Latex>
        </Equation>
        <ListItem>
          In both cases, the gradient of the adjoint state is required.
        </ListItem>
      </UnorderedList>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Metric-based local remesher
      </Heading>
      <UnorderedList>
        <ListItem>
          Riemannian metric space
          <Equation>
            <Latex>{`$$ \\ell_{\\mathcal{M}} \\left( \\mathbf{ab} \\right) = \\int_0^1 \\sqrt{^t \\mathbf{ab} \\mathcal{M} \\left( \\mathbf{a} + t \\mathbf{ab} \\right)} \\, \\mathrm{d}t $$`}</Latex>
          </Equation>
          <Equation>
            <Latex>{`$$ \\lvert K \\rvert _{\\mathcal{M}} = \\int_K \\sqrt{\\mathrm{det} \\left( \\mathcal{M} \\right)} \\, \\mathrm{d}K $$`}</Latex>
          </Equation>
        </ListItem>
        <ListItem>
          Modify the distance and the volume computation according to these
          formula in the remesher and generate a unit mesh for this metric
        </ListItem>
        <ListItem>
          <Alert>Existence problem</Alert> is solved once to generate an initial
          coarse mesh
        </ListItem>
        <ListItem>
          If a mesh modification leads to an invalid mesh, it is rejected
          <UnorderedList>
            <ListItem>Collapse small edges</ListItem>
            <ListItem>Split long edges</ListItem>
            <ListItem>Perform point smoothing to improve mesh quality</ListItem>
            <ListItem>
              Perform edge and face swaps to improve mesh quality{" "}
            </ListItem>
          </UnorderedList>
        </ListItem>
      </UnorderedList>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Metric-based local remesher
      </Heading>
      <UnorderedList>
        <ListItem>Based on a unique cavity operator</ListItem>
        <ListItem>
          Remesh the surface and the volume at the same time based on geometry
          surface definition to <Alert>insert points on the surface</Alert>
        </ListItem>
      </UnorderedList>
      <Image
        fileName="metric.png"
        legend="Metric-based local remeshing."
        width="62%"
      />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Workflow
      </Heading>
      <UnorderedList>
        <ListItem>
          Mesh adaptation is a <Alert>non-linear</Alert> problem
        </ListItem>
        <ListItem>
          Iterative process required to converge the couple mesh-solution
        </ListItem>
      </UnorderedList>
      <Image
        fileName="workflow.png"
        legend="Metric adaptation workflow."
        width="52%"
      />
    </Full>

    <TwoColumns
      title="Results"
      left={<Image fileName="cl.svg" legend="Lift convergence." width="90%" />}
      right={
        <Image fileName="cm.svg" legend="Moment convergence." width="90%" />
      }
    ></TwoColumns>

    <Full>
      <Heading color="primary" textAlign="left">
        Results
      </Heading>
      <Image fileName="cd.svg" legend="Drag convergence." width="50%" />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Results
      </Heading>
      <Image
        fileName="cp.png"
        legend="Pressure coefficient distribution."
        width="70%"
      />
    </Full>

    <TwoColumns
      title="Results"
      left={<Image fileName="cut_msh.png" legend="Mesh" width="90%" />}
      right={
        <Image fileName="cut_sol.png" legend="Density contours" width="90%" />
      }
    ></TwoColumns>

    <Full>
      <Heading color="primary" textAlign="left">
        Results
      </Heading>
      <Image fileName="horizontal.png" legend="Horizontal cut." width="70%" />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Results
      </Heading>
      <Image
        fileName="horizontal_zoom.png"
        legend="Horizontal cut zoom."
        width="70%"
      />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Results
      </Heading>
      <Image
        fileName="bl.png"
        legend="Boundary layer computed with tetrahedra only."
        width="70%"
      />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Results
      </Heading>
      <Image
        fileName="shock_bl.png"
        legend="Shock boundary layer interaction."
        width="70%"
      />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        But...
      </Heading>
      <UnorderedList>
        <ListItem>
          In order to properly remesh, the geometry is needed to insert points
          on the surface
        </ListItem>
        <ListItem>DPW7 only provides CATPart or IGES geometries</ListItem>
        <UnorderedList>
          <ListItem>
            CATPart: a commercial software is needed only to be able to read a
            file format...
          </ListItem>
          <ListItem>
            IGES: the curve common to two patches is not given, only a
            collection of patches...
          </ListItem>
          <ListItem>
            The only readable geometry data are provided by the DPW7 meshes
          </ListItem>
        </UnorderedList>
      </UnorderedList>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        But...
      </Heading>
      <Image fileName="htp.png" legend="Geometry artifacts." width="70%" />{" "}
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        But...
      </Heading>
      <Image
        fileName="htp_zoom.png"
        legend="Geometry artifacts zoom."
        width="70%"
      />{" "}
    </Full>

    <Centered>
      <Heading color="secondary">Conclusions & perspectives</Heading>
      <UnorderedList>
        <ListItem>
          Goal-oriented anisotropic mesh adaptation illustatred on a DPW7 test
          case
        </ListItem>
        <ListItem>
          The geometry definition is <Alert>crucial</Alert> for mesh adaptation
          convergence
        </ListItem>
        <ListItem>No compatibility between CAD kernels</ListItem>
        <ListItem>
          Even if the CAD format were easily readable, there is no access to the
          parametrization needed for shape optimization problem
        </ListItem>
        <ListItem>
          <Alert>No geometry, no mesh, no solution, ...</Alert>
        </ListItem>
      </UnorderedList>
    </Centered>
  </InriaDeck>
);

const root = createRoot(document.getElementById("root")!);
root.render(<Presentation />);
