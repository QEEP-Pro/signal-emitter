class Parameter:
    def __init__(self, id: int, name: str, unit: str = '', law: str = 'sin', period: int = 1, noise: bool = False, mean: float = 1, dispersion: float = 0):
        self.id = id
        self.name = name
        self.unit = unit
        self.law = law
        self.period = period
        self.noise = noise
        self.mean = mean
        self.dispersion = dispersion

