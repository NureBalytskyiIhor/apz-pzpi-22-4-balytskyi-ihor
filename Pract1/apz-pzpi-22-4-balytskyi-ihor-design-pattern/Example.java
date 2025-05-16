// Приклад коду без використання State
//java
class Player {
    String state = "idle";

    void handleInput(String input) {
        if (state.equals("idle") && input.equals("run")) {
            state = "running";
            System.out.println("Start running");
        } else if (state.equals("running") && input.equals("stop")) {
            state = "idle";
            System.out.println("Stop running");
        }
        // ...
    }
}

// Реалізація з використанням State
interface State {
    void handle(Player context, String input);
}

class IdleState implements State {
    public void handle(Player context, String input) {
        if (input.equals("run")) {
            context.setState(new RunningState());
            System.out.println("Start running");
        }
    }
}

class RunningState implements State {
    public void handle(Player context, String input) {
        if (input.equals("stop")) {
            context.setState(new IdleState());
            System.out.println("Stop running");
        }
    }
}

class Player {
    private State state = new IdleState();

    public void setState(State state) {
        this.state = state;
    }

    public void handleInput(String input) {
        state.handle(this, input);
    }
}