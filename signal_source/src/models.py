class Parameter:
    def __init__(self, id, name, unit='', law='sin', period=1, noise=False):
        self.id = id
        self.name = name
        self.unit = unit
        self.law = law
        self.period = period
        self.noise = noise

