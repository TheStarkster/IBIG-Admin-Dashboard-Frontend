import React, { Component, useState } from "react";
import Tournaments from "../partials/tournaments";
import Dashboard from "../partials/dashboard";
import Games from "../partials/games";
import Banner from "../partials/banner";

export default function AdminMaster() {
  const [navbar, setNavbar] = useState(0);
  const NavItems = [<Banner />, <Dashboard />, <Tournaments />, <Games />];
  return (
    <React.Fragment>
      <div id="wrapper">
        <nav class="navbar navbar-dark fixed-top align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
          <div class="container-fluid d-flex flex-column p-0">
            <a
              class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
              href="#"
            >
              <div class="sidebar-brand-text mx-3">
                <span>IBIg PLay</span>
              </div>
            </a>
            <hr class="sidebar-divider my-0" />
            <ul class="nav navbar-nav text-light" id="accordionSidebar">
              <li
                class="nav-item"
                role="presentation"
                onClick={() => setNavbar(0)}
              >
                <a class="nav-link">
                  <i class="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li
                class="nav-item"
                role="presentation"
                onClick={() => setNavbar(1)}
              >
                <a class="nav-link">
                  <i class="fas fa-trophy"></i>
                  <span>Tournament</span>
                </a>
              </li>
              <li
                class="nav-item"
                role="presentation"
                onClick={() => setNavbar(2)}
              >
                <a class="nav-link">
                  <i class="fas fa-gamepad" />
                  <span>Games</span>
                </a>
              </li>
              <li
                class="nav-item"
                role="presentation"
                onClick={() => setNavbar(3)}
              >
                <a class="nav-link">
                  <i class="fas fa-ad"></i>
                  <span>Banner</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="d-flex flex-column" id="content-wrapper">
          <nav class="navbar navbar-light navbar-expand shadow mb-4 topbar static-top">
            <div class="container-fluid">
              <button
                class="btn btn-link d-md-none rounded-circle mr-3"
                id="sidebarToggleTop"
                type="button"
              >
                <i class="fas fa-bars"></i>
              </button>
              <ul class="nav navbar-nav flex-nowrap ml-auto">
                <li class="nav-item dropdown d-sm-none no-arrow">
                  <a
                    class="dropdown-toggle nav-link"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    href="#"
                  >
                    <i class="fas fa-search"></i>
                  </a>
                  <div
                    class="dropdown-menu dropdown-menu-right p-3 animated--grow-in"
                    role="menu"
                    aria-labelledby="searchDropdown"
                  >
                    <form class="form-inline mr-auto navbar-search w-100">
                      <div class="input-group">
                        <input
                          class="bg-light form-control border-0 small"
                          type="text"
                          placeholder="Search for ..."
                        />
                        <div class="input-group-append">
                          <button class="btn btn-primary py-0" type="button">
                            <i class="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>
                <li class="nav-item dropdown no-arrow" role="presentation">
                  <div class="nav-item dropdown no-arrow">
                    <a
                      class="dropdown-toggle nav-link"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      href="#"
                    >
                      <span class="d-none d-lg-inline mr-2 text-gray-600 small">
                        Valerie Luna
                      </span>
                      <img
                        class="border rounded-circle img-profile"
                        src="assets/img/avatars/avatar1.jpeg"
                      />
                    </a>
                    <div
                      class="dropdown-menu shadow dropdown-menu-right animated--grow-in"
                      role="menu"
                    >
                      <a class="dropdown-item" role="presentation" href="#">
                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        &nbsp;Profile
                      </a>
                      <a class="dropdown-item" role="presentation" href="#">
                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                        &nbsp;Settings
                      </a>
                      <a class="dropdown-item" role="presentation" href="#">
                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                        &nbsp;Activity log
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" role="presentation" href="#">
                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        &nbsp;Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <div id="content">
            <div class="container-fluid">{NavItems[navbar]}</div>
            <footer class="bg-white sticky-footer">
              <div class="container my-auto">
                <div class="text-center my-auto copyright">
                  <span>
                    <a href="http://www.grevity.in" target="_blank">
                      Developed By Grevity.in
                    </a>
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <a class="border rounded d-inline scroll-to-top" href="#page-top">
          <i class="fas fa-angle-up"></i>
        </a>
      </div>
    </React.Fragment>
  );
}
