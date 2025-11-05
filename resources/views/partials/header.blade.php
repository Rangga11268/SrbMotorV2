<header class="header" id="header">
    <div id="menu-btn" class="fas fa-bars"></div>

    <a href="{{ url('/') }}" class="logo">
        <img src="{{ asset('assets/icon/logo trans.png') }}" alt="SRB Motors Logo">
        SRB<span>Motors</span>
    </a>

    <nav class="navbar">
        <a href="{{ url('/') }}#home">home</a>
        <a href="{{ route('motors.index') }}">motor</a>
    </nav>

    <div id="auth-btn">
        @auth
            <div class="dropdown">
                <button class="btn login login-text-btn dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user me-2"></i>{{ Auth::user()->name }}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                        <a class="dropdown-item" href="{{ route('motors.user-transactions') }}">
                            <i class="fas fa-list"></i> Riwayat Pemesanan
                        </a>
                    </li>
                    @if(Auth::user()->isAdmin())
                        <li>
                            <a class="dropdown-item" href="{{ route('admin.dashboard') }}">
                                <i class="fas fa-tachometer-alt"></i> Admin Panel
                            </a>
                        </li>
                    @endif
                    <li>
                        <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </li>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </ul>
            </div>
        @else
            <a href="{{ route('login') }}" class="btn login login-text-btn">login</a>
            <i class="far fa-user login-icon-btn"></i>
        @endauth
    </div>
</header>

<div class="login-form-container">
    <span id="close-login-form" class="fas fa-times"></span>

    <form action="">
        <h3>user login</h3>
        <input type="email" placeholder="email" class="box" />
        <input type="password" placeholder="password" class="box" />
        <p>forget your password <a href="#">click here</a></p>
        <input type="submit" value="login" class="btn" />
        <p>or login with</p>
        <div class="buttons">
            <a href="#" class="btn"> google </a>
            <a href="#" class="btn"> facebook </a>
        </div>
        <p>don't have an account <a href="#">create one</a></p>
    </form>
</div>