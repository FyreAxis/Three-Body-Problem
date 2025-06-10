# Three-Body-Problem
I have always been interested in chaos, and
I thought, what better way is there to
simulate chaos than creating the
3-body problem in JavaScript.
A chaotic problem in a chaotic language—perfect.
For the uninitiated, the 3-body problem
has long plagued astrophysicists as a 
system so chaotic that no single
equation has been found to predicts its
movement for long durations. The system is
so chaotic i.e. sensitive to initial
conditions, that this problem is believed to
be unsolvable by some. Nonetheless,
computers can simulate these interactions
accurately... Well, sort of. The thing is,
because the system is chaotic, we'd need
REALLY good precision to simulate the problem
for real applications, which is nigh-impossible.
Not only would be need many significant
figures which would be, again, nigh-impossible
since you can't slap celestial bodies on a
high-precision scale and get a giant caliper
to measure the distance, but also,
no 3-body systems truly exist. That's because
gravity binds all matter. Right now,
you are exerting a miniscule gravitational
force on me, your computer, GitHub's servers,
and even a spec of dust in a galaxy billions
of lightyears away. That is all to say,
it's an n-body system where n is (un)fortunately
bigger than 3.

So then why simulate it anyway? Chaotic systems
that I've been fascinated by still have
applications. For one, this 3-body system
may not be entirely accurate for predicting
a 3-star system in the next billion years,
but it very well could predict the few days,
months, or even years. In fact, weather
prediction is usually only accurate to
several days in advance which is why a
7 day forecast is popular vs. a year forecast
being printed on your calendar. The effects
of being sensitive to initial conditions
worsen over time. One last note about
chaos. Chaos is simply hard to predict,
it's not random. That's why there are no
random number generation functions present
in this code, so no need to worry about
computer (pseudo-)randomness!

Anyhow, I'll try to lay out my thought process
in how I approached the physics and then
the software engineering. First, my 
scope is to simulate three celestial bodies.
They could be completely still, moving
a significant fraction of the speed of light,
or anything in between. Second, these
bodies could be asteroids, planets, or even
stars, so their masses should be able to
range from very small to very large.
Thirdly, I'm not interested in simulating
non-gravitational forces such as
electromagnetic forces, so no need to
worry about the makeup of a celestial body.
Finally, I will want to allow for 3-
dimensional movement and potentially
display it in a 3-dimensional grid.

In order to figure out what we're going to
simulate, we'll need some math.
Here are the relevant physics equations:

a_x = (v_x - v_x0) / t
Accel. = (Velocity - Starting Velocity) / Duration
This is the basic definition for acceleration.
Where X denotes the X direction.
This also works for the Y and Z, so we'll
likely be using vectors for velocity
and acceleration.
Notably, we can rearrange the equation as such:
v_x - v_x0 = a_x * t
v_x = (a_x * t) + v_x0

Likewise the definition for velocity:
v_x = (x - x_0) / t
becomes
x = (v_x * t) + x_0

|F_g| = G (m_1 * m_2) / (r^2)
Force of Gravity = (Mass 1 * Mass 2) / Radius^2
This is Newton's Law of Gravity which
uses the universal gravitational constant G.

F_net = m_sys * a_sys
Net Force = Mass of System * Accel. of System
This is Newton's Second Law. This will be
essential in relating our force to
acceleration.

As far as software engineering goes,
I want to build this progressively.
I'll start by approaching this with
the movement prediction,
then if allowable, I may implement
3-d models and a 3-d graphing
environment with other tools.

I think OOP is the way to go.
I can create celestial bodies as
objects which will be constructed
to the user's specifications, and I
can construct my own for testing.
They will track practically everything:
mass, velocity, acceleration, and position.

I will run a loop that calculates an
updated acceleration and position for
the entire system and give them to some
buffer to then be displayed and
be updated in the objects sequentially.

Now that the big picture stuff is
out of the way, we can start to break
the problem down into smaller digestible chunks
with a roadmap of how to keep our
code clean and readable.