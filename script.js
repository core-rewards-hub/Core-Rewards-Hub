/* ===========================
   Core Rewards Hub - Phase 3
   Part 1
=========================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

:root{

    --bg:#07111f;
    --bg2:#0d1b2a;

    --glass:rgba(255,255,255,.08);

    --border:rgba(255,255,255,.15);

    --primary:#1DA1F2;

    --secondary:#4CC9F0;

    --success:#16c784;

    --danger:#ff5b5b;

    --text:#ffffff;

    --muted:#a9b4c7;

    --radius:18px;

}

body{

    font-family:'Poppins',sans-serif;

    background:linear-gradient(135deg,var(--bg),var(--bg2));

    color:var(--text);

    min-height:100vh;

    overflow-x:hidden;

    position:relative;

}

/* Animated Background */

.background{

    position:fixed;

    inset:0;

    overflow:hidden;

    z-index:-1;

}

.circle{

    position:absolute;

    border-radius:50%;

    filter:blur(70px);

    animation:float 12s ease-in-out infinite;

}

.one{

    width:320px;

    height:320px;

    background:#008cff;

    top:-80px;

    left:-100px;

}

.two{

    width:260px;

    height:260px;

    background:#00d4ff;

    right:-80px;

    top:120px;

    animation-delay:3s;

}

.three{

    width:280px;

    height:280px;

    background:#0047ff;

    bottom:-120px;

    left:35%;

    animation-delay:6s;

}

@keyframes float{

0%,100%{

transform:translateY(0);

}

50%{

transform:translateY(-35px);

}

}

/* Main Container */

.container{

    width:min(1200px,92%);

    margin:auto;

    padding:30px 0 60px;

}

/* Glass Effect */

.glass{

    background:var(--glass);

    border:1px solid var(--border);

    backdrop-filter:blur(16px);

    -webkit-backdrop-filter:blur(16px);

    border-radius:var(--radius);

    box-shadow:0 10px 30px rgba(0,0,0,.35);

}

/* Header */

header{

    display:flex;

    justify-content:space-between;

    align-items:center;

    gap:20px;

    margin-bottom:30px;

    flex-wrap:wrap;

}

.logo{

    display:flex;

    align-items:center;

    gap:12px;

}

.logo i{

    font-size:32px;

    color:var(--secondary);

}

.logo h1{

    font-size:28px;

    font-weight:700;

}

.header-buttons{

    display:flex;

    gap:12px;

    flex-wrap:wrap;

}

/* Hero */

.hero{

    padding:35px;

    margin-bottom:25px;

}

.hero h2{

    font-size:32px;

    margin-bottom:12px;

}

.hero p{

    color:var(--muted);

    line-height:1.8;

}
