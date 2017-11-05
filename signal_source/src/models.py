class Parameter:
    def __init__(self, id: int, name: str, unit: str = '', law: str = 'sin', period: int = 1, noise: bool = False):
        self.id = id
        self.name = name
        self.unit = unit
        self.law = law
        self.period = period
        self.noise = noise

